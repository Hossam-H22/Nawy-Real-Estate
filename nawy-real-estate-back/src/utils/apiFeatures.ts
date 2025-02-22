import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

const searchFields: any = {
    "user": ["name", "email", "phone"],
    "area": ["name"],
    "city": ["name", "country"],
    "project": ["name", "description"],
    "property": ["name", "description"],
}

const realtions: any = {
    "user": [
        { field: "cities", table: "city" },
        { field: "areas", table: "area" },
        { field: "projects", table: "project" },
        { field: "properties", table: "property" },
    ],
    "city": [
        { field: "createdBy", table: "user" },
        { field: "areas", table: "area" },
    ],
    "area": [
        { field: "createdBy", table: "user" },
        { field: "cityId", table: "city" },
        { field: "projects", table: "project" },
    ],
    "project": [
        { field: "createdBy", table: "user" },
        { field: "areaId", table: "area" },
        { field: "properties", table: "property" },
    ],
    "property": [
        { field: "createdBy", table: "user" },
        { field: "projectId", table: "project" },
    ],
}

class ApiFeatures<T extends ObjectLiteral> {
    private queryBuilder: SelectQueryBuilder<T>;
    private queryData: any;
    private tableAlias: string;

    constructor(queryBuilder: SelectQueryBuilder<T>, tableAlias:string, queryData: any) {
        this.queryBuilder = queryBuilder;
        this.tableAlias = tableAlias;
        this.queryData = queryData;
    }

    paginate(): this {
        let { page, size } = this.queryData;
        if (!page || page <= 0) page = 1;
        if (!size || size <= 0) size = 20;
        if (size > 40) size = 40;
        const skip = (parseInt(page) - 1) * parseInt(size);

        this.queryBuilder.take(size).skip(skip);
        return this;
    }

    filter(): this {
        const excludeQueryParams = ['page', 'size', 'sort', 'fields', 'details', 'search'];
        const filterQuery = { ...this.queryData };
        excludeQueryParams.forEach(param => delete filterQuery[param]);

        Object.entries(filterQuery).forEach(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
                Object.entries(value).forEach(([operator, val]) => {
                    this.queryBuilder.andWhere(`${this.tableAlias}.${key} ${this.getOperator(operator)} :value`, { value: val });
                });
            } else {
                this.queryBuilder.andWhere(`${this.tableAlias}.${key} = :value`, { value });
            }
        });
        return this;
    }

    private getOperator(operator: string): string {
        const operatorMap: Record<string, string> = {
            gt: '>',
            gte: '>=',
            lt: '<',
            lte: '<=',
            eq: '=',
            neq: '<>',
            in: 'IN',
            nin: 'NOT IN',
        };
        return operatorMap[operator] || '=';
    }

    sort(): this {
        if (this.queryData.sort) {
            type orderType = { field:string, order:string }
            const orderBys:orderType[] = this.queryData.sort.split(',').map((field: string) => {
                return field.startsWith('-')
                    ? { field: field.substring(1), order: 'DESC' }
                    : { field, order: 'ASC' };
            });
            orderBys.forEach(({ field, order }) => {
                this.queryBuilder.addOrderBy(`${this.tableAlias}.${field}`, order as 'ASC' | 'DESC');
            });
        }
        return this;
    }

    select(): this {
        if (this.queryData.fields) {
            const AllFields = this.queryData.fields.split(',').map((field: string) => `${field.trim()}`);
            
            // Select Some Fields from table
            const AllRelationFieldsSet = new Set(realtions[this.tableAlias].map((item: {field:string, table:string}) => item.field));
            let selectFields = AllFields.filter((item: string) => !AllRelationFieldsSet.has(item));
            if(!selectFields.includes('_id')) selectFields.push('_id');
            selectFields = selectFields.map((item:string) => `${this.tableAlias}.${item}`)
            this.queryBuilder.select(selectFields)
            
            // Apply join with other tables
            const relationFields = realtions[this.tableAlias].filter((item: { field: string }) => AllFields.includes(item.field));
            relationFields.forEach((item: {field:string, table:string}) => {
                this.queryBuilder.leftJoinAndSelect(`${this.tableAlias}.${item.field}`, item.table);
            });
        }
        return this;
    }

    search(): this {
        const searchField: string[] = searchFields[this.tableAlias];
        if (this.queryData.search) {
            // '(LOWER(title) LIKE :search OR LOWER(description) LIKE :search)',
            let searchQuary: string = `(LOWER(${this.tableAlias}.${searchField[0]}) LIKE :search`
            if(searchField.length > 1){
                for(let i=1; i<searchField.length; i++) searchQuary+=` OR LOWER(${this.tableAlias}.${searchField[i]}) LIKE :search`
            }
            searchQuary += ')';
            
            this.queryBuilder.andWhere(
                searchQuary,
                { search: `%${this.queryData.search.toLowerCase()}%` }
            );
        }
        return this;
    }
}


export default ApiFeatures;