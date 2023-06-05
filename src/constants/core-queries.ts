export const getTablesQuery = (schema = "public") => `
    SELECT 
        table_name as name 
    FROM information_schema.tables 
    WHERE table_schema = '${schema}'
    ORDER BY table_name
`;

export const getColumnsQuery = (table: string) => `
    SELECT 
        column_name as name,
        data_type as type
    FROM information_schema.columns
    WHERE table_name = '${table}'
    ORDER BY column_name
`;
