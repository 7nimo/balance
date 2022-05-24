import { getConfig } from 'src/config';
import { DataSource } from 'typeorm';

const dataSource = new DataSource(getConfig());
dataSource.initialize();

export default dataSource;
