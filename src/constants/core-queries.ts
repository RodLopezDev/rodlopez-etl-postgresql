export const getTablesQuery = (schema = "public") => `
    SELECT 
        table_name 
    FROM information_schema.tables 
    WHERE table_schema = '${schema}'
    ORDER BY table_name
`;

export const getColumnsQuery = (table: string) => `
    SELECT 
        column_name, 
        data_type, 
        is_nullable, 
        column_default, 
        character_maximum_length, 
        numeric_precision,
        numeric_scale
    FROM information_schema.columns
    WHERE table_name = '${table}'
    ORDER BY ordinal_position
`;
