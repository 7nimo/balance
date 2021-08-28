export const copyLloydsCsv = (accountId: string, filePath: string) => 
`
  CREATE TEMPORARY TABLE temp
  (
    transaction_date date,
    transaction_type varchar,
    sort_code varchar,
    account_number int,
    transaction_desc varchar,
    debit_amount decimal,
    credit_amount decimal,
    balance decimal
  );

  SET datestyle = "ISO, DMY";

  COPY temp
  FROM '/var/${filePath}'
  DELIMITER ',' CSV HEADER;

  INSERT INTO TRANSACTION
  (
    account_id,
    transaction_date,
    transaction_type,
    transaction_desc,
    debit_amount,
    credit_amount,
    balance
  )
  SELECT
    '${accountId}',
    transaction_date,
    transaction_type,
    transaction_desc,
    debit_amount,
    credit_amount,
    balance
  FROM temp;

  DROP TABLE temp;
`;