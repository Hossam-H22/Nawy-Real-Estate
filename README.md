# Nawy Real Estate

## Prerequisites:
  - Node
  - Postgres Database
  - npm

## Run Steps

### Step 1
```bash
  git clone https://github.com/Hossam-H22/Nawy-Real-Estate.git
  cd Nawy-Real-Estate
```

### Step 2
```bash
  cd Nawy-Real-Estate/nawy-real-estate-back
  npm i
```

### Step 3
- go to ```.env``` file in ```Nawy-Real-Estate/nawy-real-estate-back```
- change ```DB_HOST``` to your postgres database host
- change ```DB_PORT``` to your postgres database port
- change ```DB_USER``` to your postgres database userName
- change ```DB_PASSWORD``` to your postgres database password
- go to postgres database and create new database called ```real_estate```

### Step 4
```bash
  cd Nawy-Real-Estate/nawy-real-estate-back
  npm run dev
```

### Step 5
```bash
  cd Nawy-Real-Estate/nawy-real-estate-front
  npm i
  npm run build
  npm run start
```


