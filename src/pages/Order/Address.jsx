import { Select, Space } from "antd";
import { useState } from "react";
import { addressData, cityData } from "../../textFile";

const AddressSelect = () => {
  const [city, setCity] = useState(addressData[cityData[0]]);
  const [district, setDistrict] = useState(addressData[cityData[0]][0]);
  const handleProvinceChange = (value) => {
    setCity(addressData[value]);
    setDistrict(addressData[value][0]);
  };
  const onSecondCityChange = (value) => {
    setDistrict(value);
  };
  return (
    <Space wrap>
      <Select
        defaultValue={cityData[0]}
        style={{
          width: 180,
        }}
        onChange={handleProvinceChange}
        options={cityData.map((province) => ({
          label: province,
          value: province,
        }))}
      />
      <Select
        style={{
          width: 180,
        }}
        value={district}
        onChange={onSecondCityChange}
        options={city.map((city) => ({
          label: city,
          value: city,
        }))}
      />
    </Space>
  );
};
export default AddressSelect;
