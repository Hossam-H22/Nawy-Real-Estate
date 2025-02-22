import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { User } from "../User/user.entity";
import { Project } from "../Project/project.entity";

export enum PropertyType {
    HOUSE = "house",
    APARTMENT = "apartment",
    LAND = "land",
    COMMERCIAL = "commercial",
}

export enum PropertyStatus {
    AVAILABLE = "available",
    SOLD = "sold",
    RENTED = "rented",
}

// Define an Image object type
class PropertyImage {
    @Column()
    url: string;

    @Column()
    caption: string;
}

@Entity("properties")
export class Property {
    @PrimaryGeneratedColumn("uuid")
    _id: string;

    @Column()
    name: string;

    @Column({ type: "text" })
    description: string;

    @Column({ type: "float" })
    price: number;

    @Column({
        type: "enum",
        enum: PropertyType,
    })
    propertyType: PropertyType;

    @Column({
        type: "enum",
        enum: PropertyStatus,
    })
    status: PropertyStatus;

    @Column()
    bedrooms: number;

    @Column()
    bathrooms: number;

    @Column()
    squareFeet: number;

    @Column("jsonb", { default: [] })
    images: PropertyImage[];

    @ManyToOne(() => User, (user) => user.properties, { onDelete: "CASCADE" })
    @JoinColumn({ name: "createdBy" })
    createdBy: User;

    @ManyToOne(() => Project, (project) => project.properties, { onDelete: "CASCADE" })
    @JoinColumn({ name: "projectId" })
    projectId: Project;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
