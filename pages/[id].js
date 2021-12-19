import React from "react";
import { useRouter } from 'next/router'

function DetailPage() {
  const router = useRouter()
  console.log(router.query)
  return <div>detail</div>;
}

export default DetailPage;
