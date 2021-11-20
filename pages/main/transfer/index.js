import React, { useState, useEffect } from "react";
import MainLayout from "components/layouts/MainLayout";
import { Modal } from "react-bootstrap";
import { Button, ModalComponent } from "components/module";
import {
  SearchReceiver,
  ConfirmationTransfer,
  Amount,
  Status,
} from "components/molecules";
import axios from "utils/axios";
import { getDataCookie } from "middleware/authorizationPage";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const dataCookie = await getDataCookie(context);
  if (!dataCookie.isLogin) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // GET ALL USER
  const allUser = await axios
    .get(`/user?page=1&limit=10&search=&sort=firstName ASC`, {
      headers: {
        Authorization: `Bearer ${dataCookie.token}`,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err.response.data);
      return [];
    });

  return {
    props: {
      data: { dataCookie, allUser },
    },
  };
}

export default function Transfer(props) {
  const router = useRouter();
  // MODAL
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // PIN
  const [pin, setPin] = useState({});

  const handleTextPin = (event) => {
    if (event.target.value) {
      const nextSibling = document.getElementById(
        `pin-${parseInt(event.target.name, 10) + 1}`
      );

      if (nextSibling !== null) {
        nextSibling.focus();
      }
    }

    setPin({ ...pin, [`pin${event.target.name}`]: event.target.value });
  };

  const handleSubmitPin = () => {
    const allPin =
      pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6;

    axios
      .get(`/user/pin?pin=${allPin}`)
      .then((res) => {
        console.log(res.data);
        postTransfer();
      })
      .catch((err) => {
        console.log(err.response);
        setIsSuccess(false);
        setMsg(err.response.data.msg);
        continueConfirmation();
        handleClose();
      });
  };

  // USER DATA
  const [data, setData] = useState({
    data: [],
    pagination: {},
  });
  const [query, setQuery] = useState({
    page: 1,
    limit: 5,
    search: "",
    sort: "firstName ASC",
  });

  const handlePagination = (e) => {
    const selectedPage = e.selected + 1;
    setQuery({
      ...query,
      page: selectedPage,
    });

    axios
      .get(
        `/user?page=${selectedPage}&limit=${query.limit}&search=${query.search}&sort=${query.sort}`
      )
      .then((res) => {
        setData(res.data);
        router.push(
          `/transfer?page=${selectedPage}&limit=${query.limit}&search=${query.search}&sort=${query.sort}`
        );
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const changeSearch = (e) => {
    setQuery({
      ...query,
      search: e.target.value,
    });

    axios
      .get(
        `/user?page=${query.page}&limit=${query.limit}&search=${e.target.value}&sort=${query.sort}`
      )
      .then((res) => {
        setData(res.data);
        router.push(
          `/transfer?page=${query.page}&limit=${query.limit}&search=${e.target.value}&sort=${query.sort}`
        );
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const getAllUser = () => {
    axios
      .get(
        `/user?page=${query.page}&limit=${query.limit}&search=${query.search}&sort=${query.sort}`
      )
      .then((res) => {
        setData(res.data);
        router.push(
          `/transfer?page=${query.page}&limit=${query.limit}&search=${query.search}&sort=${query.sort}`
        );
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  // GET USER
  const [dataUser, setDataUser] = useState({});

  const getUser = () => {
    axios
      .get(`/user/profile/${props.data.dataCookie.id}`)
      .then((res) => {
        console.log(res);
        setDataUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // did mount
  useEffect(() => {
    getAllUser();
    getUser();
  }, []);

  // did update
  // useEffect(() => {
  //   getAllUser();
  // }, [query.search]);

  // ALUR APP
  const [comp, setComp] = useState({
    isSearch: true,
    isConfirmation: false,
    isStatus: false,
  });

  const continueSearch = (item) => {
    setComp({
      isSearch: false,
      isAmount: true,
      isConfirmation: false,
      isStatus: false,
    });

    setTransferUser(item);
  };

  const continueAmount = () => {
    setTransfer({
      ...transfer,
      date: new Date().toString(),
    });

    setComp({
      isSearch: false,
      isAmount: false,
      isConfirmation: true,
      isStatus: false,
    });
  };

  const continueConfirmation = () => {
    setComp({
      isSearch: false,
      isAmount: false,
      isConfirmation: false,
      isStatus: true,
    });
  };

  // TRANSFER DATA
  const [transfetUser, setTransferUser] = useState({});
  const [transfer, setTransfer] = useState({
    amount: "",
    notes: "",
    date: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [msg, setMsg] = useState("");

  const postTransfer = () => {
    axios
      .post(`/transaction/transfer`, {
        receiverId: transfetUser.id,
        amount: transfer.amount,
        notes: transfer.notes,
      })
      .then((res) => {
        console.log(res.data.data);
        setIsSuccess(true);
        continueConfirmation();
        handleClose();
      })
      .catch((err) => {
        console.log(err.response);
        setIsSuccess(false);
        setMsg(err.response.data.msg);
        continueConfirmation();
        handleClose();
      });
  };

  const handleText = (e) => {
    setTransfer({
      ...transfer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(transfer);
    handleShow();
    // continueConfirmation();
  };

  console.log(data.data);
  console.log(data.pagination);

  return (
    <MainLayout
      title="Transfer"
      firstName={dataUser.firstName}
      lastName={dataUser.lastName}
      noTelp={dataUser.noTelp}
      image={dataUser.image}
    >
      {/* COMPONENT */}

      {comp.isSearch ? (
        <SearchReceiver
          data={data.data}
          handleClick={(item) => continueSearch(item)}
          onChange={changeSearch}
          // pagination
          countPagination={data.pagination.totalPage}
          handlePagination={handlePagination}
        />
      ) : comp.isAmount ? (
        <Amount
          name={`${transfetUser.firstName} ${transfetUser.lastName}`}
          noTelp={transfetUser.noTelp}
          handleText={handleText}
          handleSubmit={continueAmount}
        />
      ) : comp.isConfirmation ? (
        <ConfirmationTransfer
          name={`${transfetUser.firstName} ${transfetUser.lastName}`}
          noTelp={transfetUser.noTelp}
          amount={transfer.amount}
          balance="1.000.000"
          date={transfer.date}
          notes={transfer.notes}
          handleSubmit={handleSubmit}
        />
      ) : (
        <Status
          name={`${transfetUser.firstName} ${transfetUser.lastName}`}
          noTelp={transfetUser.noTelp}
          amount={transfer.amount}
          balance="1.000.000"
          date={transfer.date}
          notes={transfer.notes}
          isSuccess={isSuccess}
          msg={msg}
          handleTryAgain={handleSubmit}
        />
      )}

      {/* MODAL */}
      <ModalComponent
        show={show}
        onHide={handleClose}
        isPin={true}
        // PIN
        handleTextPin={handleTextPin}
        handleSubmitPin={handleSubmitPin}
      />
    </MainLayout>
  );
}
