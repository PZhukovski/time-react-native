import {Col1} from "./src/RNCore/components/markup/markup";
import {FieldTime} from "./src/RNCore/components/fields/FieldTime";
import React from "react";
import {EDate} from "./src/RNCore/sugar/date";
import {Text} from "react-native";

export default function App() {
    return (
        <Col1 class={'m-5'}>
            <Text>Привет! Ниже должно быть по больше примеров использования готового компонента. </Text>
            <Text>Разной ширины, с разным фоном и цветом шрифта</Text>
                <FieldTime
                    class={'w-full h-12 mx-3.5 bg-primary text-mainText text-white'}
                    value={null}
                />
                <FieldTime
                    class={'max-w-xs h-8 mx-3.5p-2 bg-danger'}
                    value={new EDate().isoDate()}
                />
                <FieldTime
                    value={"14:20"}
                    class={'w-150 h-16 mx-3.5 bg-success'}
                    useButtons={true}
                />
                 <FieldTime
                    value={"14:20"}
                    class={'w-max h-8 mx-3.5 bg-secondary text-body'}
                    useButtons={true}
                />
                 <FieldTime
                    value={"87:20"}
                    class={'w-84 min-h-max mx-3.5 p-2 bg-silver text-successDark'}
                    useButtons={true}
                />
                 <FieldTime
                    value={"87:20"}
                    class={'w-full min-h-fit mx-3.5 p-3 bg-warning text-mainText'}
                    useButtons={true}
                />

        </Col1>

    );
}
