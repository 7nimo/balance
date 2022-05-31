import * as d3 from 'd3';

export const formatDate = d3.timeFormat('%d/%m/%Y'); // move this to d3 util functions

// accessors
export const x = ([x]: [Date, number[]]): Date => x;
export const y = ([, y]: [Date, number[]]): number => y[0];
