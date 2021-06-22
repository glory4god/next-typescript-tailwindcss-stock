import React, { FC } from 'react';
import Container from '../../components/ui/Container';
import Button from '@material-ui/core/Button';
import SubNavbar from '../../components/common/Subnavbar';
import SelectCalender from '../../components/ui/Calender';
import SelectInput from '../../components/ui/SelectInput';
import AutoCompleteInput from '../../components/ui/AutoCompleteInput';
import GraphHeader from '../../components/chart/GraphHeader';
import DataInfo from '../../components/chart/DataInfo';
import SaveReport from '../../components/chart/SaveReport';
import type {
  DataCondition,
  CompanyValueData,
} from '../../types/chart/ChartType';
import {
  conditionList,
  countryList,
  marketList,
  value,
  graphEffect,
  getToday,
} from '../../lib/context/ChartContext';

interface Props {}

type IsLoading = {
  isSave: boolean;
  isDrawing: boolean;
};

const initialDataCondition: DataCondition = {
  condition: '',
  country: '',
  market: '',
  company: '',
  value: '',
  graphEffect: '',
};
const Line: FC<Props> = () => {
  const [isSelect, setIsSelect] = React.useState<boolean>(false);
  const [dataCondition, setDataCondition] =
    React.useState<DataCondition>(initialDataCondition);
  const [company, setCompany] = React.useState<Array<any>>([]);
  const [companyList, setCompanyList] = React.useState<Array<string>>([]);
  const [companyStartDate, setCompanyStartDate] = React.useState<string>('');
  const [companyEndDate, setCompanyEndDate] = React.useState<string>('');
  const [dateRange, setDateRange] = React.useState<Array<Date | null>>([]);
  const [valueData, setValueData] = React.useState<Array<CompanyValueData>>([]);
  const [isLoading, setIsLoading] = React.useState<IsLoading>({
    isSave: false,
    isDrawing: false,
  });

  const getCompanyData = React.useCallback(async (market: string | null) => {
    setCompany([]);
    if (market !== null) {
      console.log('getCompanyData!');
      const toLowerMarket = market?.toLowerCase();
      const response = await fetch(
        `http://localhost:8080/api/stock/company/${toLowerMarket}`,
      );
      const resJson = await response.json();

      if (!response.ok) {
        return window.alert('failed!');
      }
      setCompany(resJson);
    }
  }, []);
  const getCompanyListData = React.useCallback(
    async (market: string | null) => {
      setCompanyList([]);
      if (market !== null) {
        console.log('getCompanyListData!');
        const toLowerMarket = market?.toLowerCase();
        const response = await fetch(
          `http://localhost:8080/api/stock/companyname/${toLowerMarket}`,
        );
        const resJson = await response.json();

        if (!response.ok) {
          return window.alert('failed!');
        }
        setCompanyList(resJson);
      }
    },
    [],
  );

  const getDateRange = React.useCallback(async (companyId: string) => {
    const response = await fetch(
      `http://localhost:8080/api/stock/data/${companyId}`,
    );

    if (!response.ok) {
      setIsSelect(false);
      return window.alert('failed!');
    }

    const resJson = await response.json();
    setCompanyStartDate(resJson[0].date);
    setCompanyEndDate(resJson[1].date);
  }, []);

  const getDataValue = React.useCallback(
    async (companyName: string, start: string, end: string) => {
      setValueData([]);
      setIsLoading({
        isSave: false,
        isDrawing: true,
      });
      const response = await fetch(
        `http://localhost:8080/api/stock/data/condition/${companyName}?start=${start}&end=${end}`,
      );
      if (!response.ok) {
        setIsLoading({ isDrawing: false, isSave: false });
        return window.alert('failed!');
      }
      const resJson = await response.json();
      setValueData(resJson);
      setIsLoading({ isSave: true, isDrawing: false });
    },
    [],
  );

  const getValueHandler = (companyName: string, start: string, end: string) => {
    getDataValue(companyName, start, end);
  };

  const isToInitialHandler = () => {
    setIsSelect(false);
    setIsLoading({
      isSave: false,
      isDrawing: false,
    });
  };
  return (
    <Container>
      <SubNavbar
        pages={{
          main: 'chart',
          sub: { first: 'line', second: 'correlation', third: 'nothing' },
        }}
      />
      <>
        <div className="md:mt-4">
          <div className="w-full grid gap-x-4 grid-cols-2 md:grid-cols-4 md:gap-8">
            <SelectInput
              onChange={(
                e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
              ) => {
                setDataCondition({
                  condition: e.target.value,
                  country: '',
                  market: '',
                  company: '',
                  value: '',
                  graphEffect: '',
                });
                isToInitialHandler();
              }}
              id="condition"
              disabled={false}
              value={dataCondition.condition}
              label="CONDITION"
              data={conditionList}
            />
            <SelectInput
              onChange={(
                e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
              ) => {
                setDataCondition(() => ({
                  ...dataCondition,
                  country: e.target.value,
                  market: '',
                  company: '',
                  value: '',
                }));
                isToInitialHandler();
              }}
              value={dataCondition.country}
              id="country"
              disabled={dataCondition.condition === ''}
              label="COUNTRY"
              data={countryList}
            />
            <SelectInput
              onChange={(
                e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
              ) => {
                setDataCondition(() => ({
                  ...dataCondition,
                  market: e.target.value,
                  company: '',
                  value: '',
                }));
                getCompanyData(e.target.value);
                getCompanyListData(e.target.value);
                isToInitialHandler();
              }}
              value={dataCondition.market}
              id="market"
              disabled={dataCondition.country === ''}
              label="MARKET"
              data={
                dataCondition.country === 'KOREA'
                  ? marketList[0]
                  : marketList[1]
              }
            />
            <AutoCompleteInput
              onChange={(e: HTMLInputElement, newValue: string | undefined) => {
                setDataCondition(() => ({
                  ...dataCondition,
                  company: newValue,
                  value: '',
                }));
                isToInitialHandler();
              }}
              value={dataCondition.company}
              id="company"
              disabled={dataCondition.market === ''}
              label="COMPANY"
              data={companyList}
            />
          </div>
          <Button
            disabled={dataCondition.company === ''}
            onClick={() => {
              const property: Array<{
                companyId: string;
                companyName: string;
              }> = company.filter((element) => {
                return element.companyName === dataCondition.company;
              });
              setIsSelect(true);
              getDateRange(property[0].companyId);
              setDateRange([]);
            }}>
            SELECT
          </Button>
          <div
            className={`${
              isSelect === true
                ? 'opacity-100 max-h-80'
                : 'opacity-0 max-h-0 pointer-events-none'
            } transition:max-height ease-in duration-500`}>
            <div className="w-full grid gap-x-4 grid-cols-2 md:grid-cols-4 md:gap-8">
              <SelectCalender
                selectedDate={dateRange[0]}
                startDate={new Date(companyStartDate)}
                endDate={new Date(companyEndDate)}
                openToDate={companyStartDate}
                onChange={(date: Date) => setDateRange([date])}
                disabled={false}
              />
              <SelectCalender
                selectedDate={dateRange[1] ? dateRange[1] : new Date()}
                startDate={
                  new Date(dateRange[0] === null ? new Date() : dateRange[0])
                }
                endDate={new Date(companyEndDate)}
                openToDate={companyEndDate}
                onChange={(date: Date) =>
                  setDateRange(() => [dateRange[0], date])
                }
                disabled={dateRange.length === 0 ? true : false}
              />
              <AutoCompleteInput
                onChange={(
                  e: HTMLInputElement,
                  newValue: string | undefined,
                ) => {
                  setDataCondition(() => ({
                    ...dataCondition,
                    value: newValue,
                  }));
                }}
                value={dataCondition.value}
                id="value"
                disabled={dateRange.length === 2 ? false : true}
                label="VALUE"
                data={value}
              />
              <AutoCompleteInput
                onChange={(
                  e: HTMLInputElement,
                  newValue: string | undefined,
                ) => {
                  setDataCondition(() => ({
                    ...dataCondition,
                    graphEffect: newValue,
                  }));
                }}
                value={dataCondition.graphEffect}
                id="nothing"
                disabled={dataCondition.value === ''}
                label="GRAPH TYPE"
                data={graphEffect}
              />
            </div>
            <Button
              disabled={dataCondition.graphEffect === '' ? true : false}
              onClick={() => {
                const property: Array<{
                  companyId: string;
                  companyName: string;
                }> = company.filter((element) => {
                  return element.companyName === dataCondition.company;
                });
                getValueHandler(
                  property[0].companyId,
                  getToday(dateRange[0] ? dateRange[0] : new Date()),
                  getToday(dateRange[1] ? dateRange[1] : new Date()),
                );
              }}>
              SELECT
            </Button>
            <Button onClick={() => setIsSelect(false)}>CANCLE</Button>
          </div>
        </div>
        {isLoading.isDrawing && (
          <div className="mt-8 font-bold text-xl">
            Drawing now... Please wait!
          </div>
        )}
        {isLoading.isSave && (
          <>
            <GraphHeader
              className="w-full pt-4 md:space-y-6 space-y-2 border-t-2"
              dataCondition={dataCondition}
              dateRange={dateRange}
              valueData={valueData}
            />
            <DataInfo
              className="border-t-2 pt-4"
              data={dataCondition}
              dateRange={dateRange}
              valueData={valueData}
            />
            <SaveReport
              className="mb-6"
              dataCondition={{
                companyName: dataCondition.company,
                value: dataCondition.value,
                graphEffect: dataCondition.graphEffect,
                startDate: dateRange[0] ? getToday(dateRange[0]) : '',
                endDate: dateRange[1] ? getToday(dateRange[1]) : '',
              }}
              refresh={() => {
                setDataCondition(initialDataCondition);
                setCompanyList([]);
                setCompany([]);
                setCompanyStartDate('');
                setCompanyEndDate('');
                setDateRange([]);
                setValueData([]);
                isToInitialHandler();
              }}
            />
          </>
        )}
      </>
    </Container>
  );
};

export default React.memo(Line);
