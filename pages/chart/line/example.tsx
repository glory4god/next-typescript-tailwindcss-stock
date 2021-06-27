import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Container from '../../../components/ui/Container';
import Button from '@material-ui/core/Button';
import SelectCalender from '../../../components/ui/Calender';
import SelectInput from '../../../components/ui/SelectInput';
import AutoCompleteInput from '../../../components/ui/AutoCompleteInput';
import GraphHeader from '../../../components/chart/GraphHeader';
import DataInfo from '../../../components/chart/DataInfo';
import type {
  DataCondition,
  CompanyValueData,
  CustomOpenCloseData,
} from '../../../types/chart/ChartType';
import {
  conditionList,
  countryList,
  marketList,
  value,
  graphEffect,
  getToday,
} from '../../../lib/context/ChartContext';
import fetcher from '../../../lib/fetcher';

const initialDataCondition: DataCondition = {
  condition: 'STOCK',
  country: 'KOREA',
  market: 'KOSPI',
  company: '삼성전자',
  value: 'CLOSE',
  graphEffect: 'LINE',
};

const dateRange: Array<Date | null> = [
  new Date('2020-01-08'),
  new Date('2021-06-04'),
];

export default function Example({
  valueData,
  customData,
}: {
  valueData: Array<CompanyValueData>;
  customData: Array<CustomOpenCloseData>;
}) {
  return (
    <Container>
      <Head>
        <title>TITLE-CHART/EXAMPLE</title>
      </Head>
      {/* <div className="md:mt-4">
        <div className="text-right">
          <Link href="/chart/line">
            <a>
              <Button>go back</Button>
            </a>
          </Link>
        </div>
        <div className="w-full grid gap-x-4 grid-cols-2 md:grid-cols-4 md:gap-8">
          <SelectInput
            id="condition"
            disabled={true}
            value={initialDataCondition.condition}
            label="CONDITION"
            data={conditionList}
          />
          <SelectInput
            value={initialDataCondition.country}
            id="country"
            disabled={true}
            label="COUNTRY"
            data={countryList}
          />
          <SelectInput
            value={initialDataCondition.market}
            id="market"
            disabled={true}
            label="MARKET"
            data={
              initialDataCondition.country === 'KOREA'
                ? marketList[0]
                : marketList[1]
            }
          />
          <AutoCompleteInput
            value={initialDataCondition.company}
            id="company"
            disabled={true}
            label="COMPANY"
            data={[initialDataCondition.company]}
          />
        </div>
        <Button disabled={true}>SELECT</Button>
        <div className={`transition:all ease-in duration-500`}>
          <div className="w-full grid gap-x-4 grid-cols-2 md:grid-cols-4 md:gap-8">
            <SelectCalender
              selectedDate={dateRange[0]}
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              openToDate={getToday(dateRange[0] ? dateRange[0] : new Date())}
              onChange={(date: Date) => {}}
              disabled={true}
            />
            <SelectCalender
              selectedDate={dateRange[1] ? dateRange[1] : new Date()}
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              openToDate={getToday(dateRange[0] ? dateRange[0] : new Date())}
              onChange={(date: Date) => {}}
              disabled={true}
            />
            <AutoCompleteInput
              value={initialDataCondition.value}
              id="value"
              disabled={true}
              label="VALUE"
              data={value}
            />
            <AutoCompleteInput
              value={initialDataCondition.graphEffect}
              id="nothing"
              disabled={true}
              label="GRAPH TYPE"
              data={graphEffect}
            />
          </div>
          <Button disabled={true}>SELECT</Button>
          <Button disabled={true}>CANCLE</Button>
        </div>
      </div>
      <>
        <GraphHeader
          className="w-full pt-4 md:space-y-6 space-y-2 border-t-2"
          dataCondition={initialDataCondition}
          dateRange={dateRange}
          valueData={valueData}
          customData={customData}
        />
        <DataInfo
          className="border-t-2 pt-4"
          data={initialDataCondition}
          dateRange={dateRange}
          valueData={valueData}
        />
      </> */}
    </Container>
  );
}

// export const getStaticProps: GetStaticProps = async (context) => {
//   const valueData = (await fetcher(
//     `http://localhost:8080/api/v1/chart/company/1?start=2018-01-08&end=2021-06-04`,
//   )) as Array<CompanyValueData>;
//   const customData = (await fetcher(
//     `http://localhost:8080/api/v1/chart/company/custom/1?start=2018-01-08&end=2021-06-04`,
//   )) as Array<CustomOpenCloseData>;
//   return {
//     props: {
//       valueData: valueData,
//       customData: customData,
//     },
//   };
// };
