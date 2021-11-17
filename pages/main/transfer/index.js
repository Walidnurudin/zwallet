import React, { useState } from "react";
import MainLayout from "components/layouts/MainLayout";
import {
  SearchReceiver,
  ConfirmationTransfer,
  Amount,
} from "components/molecules";

export default function Transfer() {
  const [data, setData] = useState([
    {
      id: 1,
      nama: "Samuel Suhi",
      noTelp: "0767834",
      nominal: "+Rp50.000",
    },
    {
      id: 2,
      nama: "Suhi Maulina",
      noTelp: "0767834",
      nominal: "+Rp50.000",
    },
    {
      id: 3,
      nama: "Samuel Lukman",
      noTelp: "0767834",
      nominal: "+Rp50.000",
    },
    {
      id: 4,
      nama: "Samuel Eto'o",
      noTelp: "0767834",
      nominal: "+Rp50.000",
    },
  ]);

  return (
    <MainLayout title="Transfer">
      <SearchReceiver data={data} />
      {/* <Amount name="Walid nurudin" noTelp="0987324" /> */}
      {/* <ConfirmationTransfer
        name="Walid nurudin"
        noTelp="0987324"
        amount="50.000"
        balance="1.000.000"
        date="May 11, 2020 - 12.20"
        notes="Uang jajan"
      /> */}
    </MainLayout>
  );
}
