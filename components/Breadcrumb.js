import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Breadcrumb as BreadcrumbAntd } from "antd";

const Breadcrumb = styled(BreadcrumbAntd)`
  .ant-breadcrumb-link,
  .ant-breadcrumb-separator,
  a {
    color: #ffffff !important;
  }
  a:hover {
    text-decoration: underline;
  }
`;

function BreadcrumbComponent({ items = [] }) {
  return (
    <div>
      <Breadcrumb>
        {items.map((el, i) => (
          <>
            {el.url ? (
              <Breadcrumb.Item key={i}>
                <Link href={el.url}>{el.title}</Link>
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item key={i}>{el.title}</Breadcrumb.Item>
            )}
          </>
        ))}
      </Breadcrumb>
    </div>
  );
}

export default BreadcrumbComponent;
