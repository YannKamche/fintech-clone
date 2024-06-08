import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Currency } from "@/interfaces/crypto";

const crypto = () => {
  //Garbage way of calling API
  // useEffect(() => {
  //   const foo = async () => {
  //     const res = await fetch('/api/listings');
  //     const data = await res.json();
  //     console.log(data)
  //   };
  //   foo();
  // }, [])

  //Query to call listings api
  const currencies = useQuery({
    queryKey: ["listings"],
    queryFn: () => fetch("/api/listings").then((res) => res.json()),
  });

  // Getting the images of the crypto by making use of a call to info api
  const ids = currencies.data
    ?.map((currency: Currency) => currency.id)
    .join(",");

  const { data } = useQuery({
    queryKey: ["info", ids],
    queryFn: () => fetch(`/api/info?ids=${ids}`).then((res) => res.json()),
    // The query is enabled only if id is true
    enabled: !!ids,
  });

  return (
    <View>
      {currencies.data?.map((currency: Currency) => (
        <View style={{ flexDirection: "row" }} key={currency.id}>
          <Image source={{ uri: data?.[currency.id].logo}} style={{width: 32, height: 32}} />
          <Text>{currency.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default crypto;
