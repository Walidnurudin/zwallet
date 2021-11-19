/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import MainLayout from "components/layouts/MainLayout";
import axios from "utils/axios";
import { getDataCookie } from "middleware/authorizationPage";
import { useRouter } from "next/router";
import Pagination from "react-paginate";

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

  return {
    props: {
      data: { dataCookie },
    },
  };
}

export default function Transfer(props) {
  const router = useRouter();
  const [data, setData] = useState({});
  const [dataUser, setDataUser] = useState({});
  const [filter, setFilter] = useState({
    page: 1,
    limit: 5,
    filter: "WEEK",
  });

  const changeFilter = (e) => {
    setFilter({
      ...filter,
      filter: e.target.value,
    });

    axios
      .get(
        `/transaction/history?page=${filter.page}&limit=${filter.limit}&filter=${filter.filter}`
      )
      .then((res) => {
        setData(res.data);
        router.push(
          `/history?page=${filter.page}&limit=${filter.limit}&filter=${filter.filter}`
        );
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  // GET USER
  const getUser = () => {
    axios
      .get(`/user/profile/${props.data.dataCookie.id}`)
      .then((res) => {
        setDataUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // GET HISTORY
  const history = () => {
    axios
      .get(
        `/transaction/history?page=${filter.page}&limit=${filter.limit}&filter=${filter.filter}`
      )
      .then((res) => {
        setData(res.data);
        router.push(
          `/history?page=${filter.page}&limit=${filter.limit}&filter=${filter.filter}`
        );
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handlePagination = (e) => {
    const selectedPage = e.selected + 1;
    setFilter({
      ...filter,
      page: selectedPage,
    });

    axios
      .get(
        `/transaction/history?page=${selectedPage}&limit=${filter.limit}&filter=${filter.filter}`
      )
      .then((res) => {
        setData(res.data);
        router.push(
          `/history?page=${selectedPage}&limit=${filter.limit}&filter=${filter.filter}`
        );
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  // did mount
  useEffect(() => {
    history();
    getUser();
  }, []);

  console.log(data);
  console.log(data.pagination);

  return (
    <MainLayout
      title="Transfer"
      firstName={dataUser.firstName}
      lastName={dataUser.lastName}
      image={dataUser.image}
      // handleGetAfterTopup={history}
    >
      <div
        style={{
          marginTop: "40px",
          background: "white",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          padding: "30px",
          marginBottom: "40px",
          borderRadius: "20px",
        }}
      >
        <div>
          <div className="d-flex justify-content-between mb-5">
            <h5 className="nunito-700">Transaction History</h5>
            <div>
              <select
                className="nunito-400"
                style={{
                  borderRadius: "12px",
                  padding: "8px 28px",
                  background: "rgba(58, 61, 66, 0.1)",
                  outline: "none",
                  border: "none",
                }}
                defaultValue=""
                onChange={changeFilter}
              >
                <option value="">select filter</option>
                <option value="WEEK">week</option>
                <option value="MONTH">month</option>
                <option value="YEAR">year</option>
              </select>
            </div>
          </div>

          <div className="d-flex flex-column">
            {data.data?.length > 0 ? (
              <>
                {data.data.map((item) => (
                  <div key={item.id}>
                    {/* {item.status === "success" ? ( */}
                    <div className="d-flex justify-content-between mt-4">
                      <div className="d-flex">
                        <img
                          src={
                            item.image
                              ? `http://localhost:3001/uploads/${item.image}`
                              : "../assets/images/transaction/def.jpeg"
                          }
                          alt="porfile"
                          width="56px"
                          height="56px"
                          style={{ borderRadius: "10px", objectFit: "cover" }}
                        />
                        <div className="ms-3">
                          <h5 className="nunito-600">
                            {item.firstName} {item.lastName}
                          </h5>
                          <span className="nunito-400 font-thrid">
                            {item.type} - {item.status}
                          </span>
                        </div>
                      </div>
                      {item.type === "send" ? (
                        <div
                          className="align-self-center nunito-700"
                          style={{ color: "#FF5B37" }}
                        >
                          -Rp{item.amount}
                        </div>
                      ) : item.type === "topup" ? (
                        <div
                          className="align-self-center nunito-700"
                          style={{ color: "#FF5B37" }}
                        >
                          +Rp{item.amount}
                        </div>
                      ) : (
                        <div
                          className="align-self-center nunito-700"
                          style={{ color: "#1EC15F" }}
                        >
                          +Rp{item.amount}
                        </div>
                      )}
                    </div>
                    {/* ) : ( */}
                    {/* <></> */}
                    {/* )} */}
                  </div>
                ))}
              </>
            ) : (
              <>
                <h1 className="text-center font-secondary nunito-700">
                  no transaction
                </h1>
              </>
            )}
          </div>

          <div className="mt-5">
            <Pagination
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={data.pagination.totalPage}
              onPageChange={handlePagination}
              containerClassName={"pagination"}
              disabledClassName={"pagination__disabled"}
              activeClassName={"pagination__active"}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
