import React from "react";
type IProps = {
  params: {
    slug: string;
  };
};

export default function page({ params }: IProps) {
  return <div>payment success. your transaction id is {params.slug}</div>;
}
