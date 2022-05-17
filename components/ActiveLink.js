import {useRouter} from "next/router";
import Link from "next/link";
import React, {Children} from "react";

const ActiveLink = ({children, href}) => {
  const router = useRouter();
  const child = Children.only(children);
  const className = child.props.className || "";
  const activeClassName = "active";

  const activeStyle = {
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#4d00ff",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    textDecoration: "none",
  };

  const nonActiveStyle = {
    fontWeight: "normal",
    color: "black",
    backgroundColor: "transparent",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    textDecoration: "none",
    fontSize: "1.1rem"
  };

  const currentPath = "/" + router.pathname.split("/")[1];

  console.log(currentPath);

  return (
    <Link href={href}>
      {React.cloneElement(child, {
        className: className + (currentPath === href ? activeClassName : ""),
        style: currentPath === href ? activeStyle : nonActiveStyle
      })}
    </Link>
  );
};

export default ActiveLink;