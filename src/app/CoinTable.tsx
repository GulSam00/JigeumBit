'use client';

import { useEffect, useState, useRef } from 'react';
import { useAtom } from 'jotai';

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the Data Grid

import { isDarkAtom } from '@/atoms';
import { ColDef } from 'ag-grid-community';

import { useBitcoinQueryType } from '@/queries/useBitcoinQuery';

interface coinColumn {
  rank: number; // 순위 (예: 1)
  id: string; // 자산 ID (예: bitcoin)
  symbol: string; // 자산 심볼 (예: BTC)
  name: string; // 자산 이름 (예: Bitcoin)
  priceUsd: string; // 현재 가격 (USD)
  marketCapUsd: string; // 시가총액 (USD)
  changePercent24Hr: string; // 24시간 가격 변동 퍼센트
  volumeUsd24Hr: string; // 24시간 거래량 (USD)
  vwap24Hr: string; // 24시간 거래량 가중 평균 가격 (VWAP)
}

export default function CoinTable({ coinArr }: useBitcoinQueryType) {
  const gridRef = useRef<AgGridReact>(null);
  const [darkMode] = useAtom(isDarkAtom);

  const columns: ColDef[] = [
    // rank, name,  priceUsd, marketCapUsd, changePercent24Hr, volumeUsd24Hr, vwap24Hr
    { headerName: '시가 총액 순위', field: 'rank', width: 150, cellDataType: 'number' },
    { headerName: '이름', field: 'name', width: 150, cellDataType: 'string' },
    {
      headerName: '가격 (USD)',
      field: 'priceUsd',
      cellDataType: 'number',
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      headerName: '시가총액 (USD)',
      field: 'marketCapUsd',
      cellDataType: 'number',
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      headerName: '24시간 변동률',
      field: 'changePercent24Hr',
      valueFormatter: (params: any) => `${params.value}%`,
    },
    { headerName: '24시간 거래량 (USD)', field: 'volumeUsd24Hr', cellDataType: 'number' },
    { headerName: '24시간 가중평균 (USD)', field: 'vwap24Hr', cellDataType: 'number' },
  ];
  const defaultColDef: ColDef = {
    enableCellChangeFlash: true, // 데이터 변경 시 플래시 효과 활성화
    cellRenderer: 'agAnimateShowChangeCellRenderer',
  };

  if (!coinArr) {
    throw new Error('coinArr is undefined');
  }

  const getTheme = () => {
    return darkMode ? 'ag-theme-quartz-dark' : 'ag-theme-quartz';
  };

  const flashCell = () => {
    const node = gridRef.current?.api.getDisplayedRowAtIndex(2);
    if (node) {
      gridRef.current!.api.flashCells({ rowNodes: [node], columns: ['priceUsd'] });
    }
  };

  return (
    <div>
      <button onClick={flashCell}>flashCell</button>
      <div className={getTheme()} style={{ height: 500 }}>
        <AgGridReact ref={gridRef} rowData={coinArr} columnDefs={columns} defaultColDef={defaultColDef} />
      </div>
    </div>
  );
}
