import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import styled from "styled-components";

const MypagePaging = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = () => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        setData(res.data)
        calculateTotalPages(res.data.length);
        console.log(res);
        console.log(res.data);
      })
  }

  const handlePageChange = (page) => { setPage(page); };
  const itemChange = (e) => {
    setItems(Number(e.target.value))
    calculateTotalPages(data.length);
  }

  const calculateTotalPages = (totalItems) => {
    const totalPages = Math.ceil(totalItems / items);
    setTotalPages(totalPages);
  }

  
  useEffect(() => {
    fetchData();
  }, []);
  
  console.log(items*(page-1), items*(page-1)+items)
  
  return (
    <div>
      {data.slice(
        items*(page-1),
        items*(page-1)+items
      ).map((v,i) => {
        return (
          <div key={i}>
            <h3>{v.title}</h3>
            <div>userId = {v.userId}, id = {v.id}</div>
            <div>{v.body}</div>
          </div>
        )
      })}
      <PaginationBox>
        <Pagination
          activePage={page}
          itemsCountPerPage={items}
          totalItemsCount={data.length-1}
          pageRangeDisplayed={5}
          onChange={handlePageChange}>
        </Pagination>
      </PaginationBox>
    </div>
  )
}

const PaginationBox = styled.div`
  .pagination { display: flex; justify-content: center; margin-top: 25px;}
  ul { list-style: none; padding: 0; }
  ul.pagination li {
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem; 
  }
  ul.pagination li:first-child{ border-radius: 5px 0 0 5px; }
  ul.pagination li:last-child{ border-radius: 0 5px 5px 0; }
  ul.pagination li a { text-decoration: none; color: #F0BE4D; font-size: 1rem; }
  ul.pagination li.active a { color: white; }
  ul.pagination li.active { background-color: #F0BE4D; }
  ul.pagination li:hover,
  ul.pagination li a:hover,
  ul.pagination li a.active { color: black; }
`

export default MypagePaging