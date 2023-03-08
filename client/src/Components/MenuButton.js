import React, { useState } from "react";
import { View, Icon, IconButton } from "native-base";
import { Menu, MenuItem } from "react-native-material-menu";
import { Entypo, SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { blockPetAction, blockUserAction } from "../Redux/Slices/userSlice";

const MenuButton = (props) => {
  const { profileType, id, navigation } = props;
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const handleBan = () => {
    if (profileType === "user") {
      dispatch(blockUserAction(id));
    } else {
      dispatch(blockPetAction(id));
    }
    navigation.navigate("Feed");
    setVisible(false);
  };

  const showMenu = () => setVisible(true);

  return (
    <View>
      <Menu
        visible={visible}
        style={{
          width: 60,
          borderRadius: 50,
          marginTop: 25,
          justifyContent: "center",
        }}
        anchor={
          <IconButton
            onPress={showMenu}
            borderRadius="25"
            alignSelf="flex-end"
            variant="ghost"
            colorScheme="warning"
            w={10}
            h={10}
            icon={
              <Icon
                as={Entypo}
                name="dots-three-horizontal"
                size="xl"
                color="coolGray.500"
              />
            }
          />
        }
        onRequestClose={() => setVisible(false)}
      >
        <MenuItem onPress={() => setVisible(false)}>
          <Icon
            as={MaterialIcons}
            name="report"
            size="xl"
            color="coolGray.500"
          />
        </MenuItem>
        <MenuItem onPress={handleBan}>
          <Icon
            as={SimpleLineIcons}
            name="ban"
            size="xl"
            color="coolGray.500"
          />
        </MenuItem>
      </Menu>
    </View>
  );
};

export default MenuButton;
