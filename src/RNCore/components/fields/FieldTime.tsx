import React, { useEffect, useState } from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import tw from "../../libs/tailwind";

interface ITimeField {
  class?: string; // tailwind classes
  value: string | null; // Если не задано, отображаем --:--
  onChange?: (time: string) => void; // Событие должно вызываться при снятии фокуса с компонента
  useButtons?: boolean; // Если true - отображаем кнопки "<" слева и справа ">" + или - 1 час соответственно
}

export function FieldTime(props: ITimeField) {

  const [formattedValue, setFormattedValue] = useState(props.value || "");

  useEffect(() => {
    if (props.value?.match(/^\d{2}:\d{2}$/)) {
      const [hours, minutes] = (props.value || "").split(":").map(Number);
      if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
        setFormattedValue(props.value);
      } else {
        setFormattedValue("Вы ввели некорретное значение времени!");
      }
    } else {
      setFormattedValue("--:--");
    }
  }, []);

  const handleTextChange = (text: string) => {
    const timeArray = text.split(":");
    let hours = timeArray[0];
    let minutes = timeArray[1];
    hours = hours > "23" ? `0${hours[0]}` : hours;
    minutes = minutes > "59" ? `00` : minutes;
    const formattedTime = `${hours}:${minutes}`;
    setFormattedValue(formattedTime);
  };

  const handleBlur = () => {
    if (formattedValue.match(/^\d{2}:\d{2}$/)) {
      if (props.onChange) {
        props.onChange(formattedValue);
      }
    }
  };

  const handleHourChange = (increment: number) => () => {
    const timeArray = formattedValue.split(":");
    const currentHour = parseInt(timeArray[0], 10);
    const newHour = (currentHour + increment + 24) % 24;
    const newTime = `${newHour.toString()}:${timeArray[1]}`;
    setFormattedValue(newTime);
  };

  return (
    <View style={tw`flex flex-row mt-8 items-center`}>
      {props.useButtons && (
        <>
          <TouchableOpacity onPress={handleHourChange(-1)}>
            <FontAwesome name="minus" size={20} color="red" />
          </TouchableOpacity>
        </>
      )}
      <TextInput
        value={formattedValue}
        onChangeText={handleTextChange}
        onBlur={handleBlur}
        keyboardType="numeric"
        maxLength={5}
        style={tw`${props.class || ""}`}
        multiline={true}
        numberOfLines={undefined}
      />
      {props.useButtons && (
        <>
          <TouchableOpacity onPress={handleHourChange(1)}>
            <FontAwesome name="plus" size={16} color="green" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

