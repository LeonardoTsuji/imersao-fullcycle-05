import { GetServerSideProps } from "next";
import React, { Component } from "react";
import { Typography, Link as MuiLink } from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import axios from "axios";
import Link from "next/link";
import { OrderStatusTranslate, OrderStatus } from "../../utils/models";
import { withIronSessionSsr } from "iron-session/next/dist";
import ironConfig from "../../utils/iron-config";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function OrdersPage(props: any) {
  const columns: GridColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 300,
      renderCell: (params) => {
        return (
          <Link passHref href={`/orders/${params.value}`}>
            <MuiLink />
          </Link>
        );
      },
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
      valueFormatter: (params) =>
        OrderStatusTranslate[params.value as OrderStatus],
    },
  ];

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_HOST}/orders`,
    fetcher,
    {
      fallbackData: props.orders,
      refreshInterval: 2,
      onError: (error) => {
        console.log(error);
        if (error.response.status === 401 || error.response.status === 403) {
          Router.push("/login");
        }
      },
    }
  );

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Typography>Minhas ordens</Typography>
      <DataGrid columns={columns} rows={props.orders} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async (context) => {
    const account = context.req.session.account;

    if (!account) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/orders`,
      {
        headers: {
          cookie: context.req.headers.cookie as string,
        },
      }
    );

    return {
      props: {
        orders: data,
      },
    };
  },
  ironConfig
);
