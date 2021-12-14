import { GetServerSideProps } from "next";
import React, { Component } from "react";
import { Typography } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import axios from "axios";

export default function OrdersPage(props: any) {
  const columns: GridColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 300,
    },
    {
      field: "amount",
      headerName: "Valor",
      width: 100,
    },
    {
      field: "credit_card_number",
      headerName: "Núm. Cartão Crédito",
      width: 200,
    },
    {
      field: "credit_card_name",
      headerName: "Nome Cartão Crédito",
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      width: 110,
    },
  ];
  return (
    <div>
      <Typography>Minhas ordens</Typography>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = axios.get("http://localhost:3000/orders", {
    headers: {
      "x-token": "",
    },
  });

  return {
    props: {
      orders: data,
    },
  };
};
