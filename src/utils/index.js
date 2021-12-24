import AsyncStorage from "@react-native-async-storage/async-storage";

export const translateMonth = (x) => {
  let month;
  switch (parseInt(x)) {
    case 1:
      month = "Januari";
      break;
    case 2:
      month = "Februari";
      break;
    case 3:
      month = "Maret";
      break;
    case 4:
      month = "April";
      break;
    case 5:
      month = "Mei";
      break;
    case 6:
      month = "Juni";
      break;
    case 7:
      month = "Juli";
      break;
    case 8:
      month = "Agustus";
      break;
    case 9:
      month = "September";
      break;
    case 10:
      month = "Oktober";
      break;
    case 11:
      month = "November";
      break;
    case 12:
      month = "Desember";
      break;
  }

  return month;
};

export const translateToMonthIndex = (x) => {
  let month;
  switch (parseInt(x)) {
    case "Januari":
      month = 1;
      break;
    case "Februari":
      month = 2;
      break;
    case "Maret":
      month = 3;
      break;
    case "April":
      month = 4;
      break;
    case "Mei":
      month = 5;
      break;
    case "Juni":
      month = 6;
      break;
    case "Juli":
      month = 7;
      break;
    case "Agustus":
      month = 8;
      break;
    case "September":
      month = 9;
      break;
    case "Oktober":
      month = 10;
      break;
    case "November":
      month = 11;
      break;
    case "Desember":
      month = 12;
      break;
  }

  return month;
}

export const saveValue = async (key, value) => {
  try {
    if (value == null) {
      await removeValue(key);
      return { success: true };
    } else {
      await AsyncStorage.setItem(key, value);
      return { success: true };
    }
  } catch (e) {
    // console.log('LOG_Async Storage access Failed', e);
    return { error: e };
  }
};

export const saveValueJSON = async (key, value) => {
  try {
    if (value == null) {
      await removeValue(key);
      return { success: true };
    } else {
      const newVal = JSON.stringify(value);
      await AsyncStorage.setItem(key, newVal);
      return { success: true };
    }
  } catch (e) {
    // console.log('LOG_Async Storage access Failed', e);
    return { error: e };
  }
};

export const saveMultiValues = async (values) => {
  const mappedValues = values.map((v, i) => {
    return [i, v];
  });

  try {
    await AsyncStorage.multiSet(mappedValues); //([["@MyApp_user", "value_1"],["@MyApp_key", "value_1"]])
    return { success: true };
  } catch (e) {
    // console.log('LOG_Async Storage access Failed', e);
    return { error: e };
  }
};

export const getValue = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    // console.log('LOG_Async Storage access Failed', e);
    return false;
  }
};

export const getValueJSON = async (key) => {
  try {
    const value = JSON.parse(await AsyncStorage.getItem(key));
    return value;
  } catch (e) {
    // console.log('LOG_Async Storage access Failed', e);
    return false;
  }
};

export const getMultiValues = async (keys) => {
  let values;
  try {
    values = await AsyncStorage.multiGet(keys);
  } catch (e) {
    // console.log('LOG_Async Storage access Failed', e);
    return false;
  }

  let value;
  values.forEach((v, i) => {
    value[v[0]] = v[1];
  });

  return value;
};

export const removeValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return { success: true };
  } catch (e) {
    // console.log('LOG_Async Storage access Failed', e);
    return { error: e };
  }
};

export const removeMultiValues = async (keys) => {
  try {
    await AsyncStorage.multiRemove(keys);
    return { success: true };
  } catch (e) {
    // console.log('LOG_Async Storage access Failed', e);
    return { error: e };
  }
};

export const getAllKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    // console.log('LOG_Async Storage access Failed', e);
  }
  return keys;
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // console.log('LOG_Async Storage access Failed', e);
  }
};
