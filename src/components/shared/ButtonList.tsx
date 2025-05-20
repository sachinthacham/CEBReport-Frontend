import Button from "./Button";
import { fetchProvinceData } from "../../services/BackendServices";
import { useEffect, useState } from "react";

type Provinces = {
  id: number;
  provinceName: string;
};

interface props {
  setSelectedProvinceId: (id: number) => void;
}

const ButtonList = ({ setSelectedProvinceId }: props) => {
  const [provinces, setProvinces] = useState<Provinces[]>([]);
  useEffect(() => {
    const fetchProvinces = async () => {
      const provinces = await fetchProvinceData();
      setProvinces(provinces);
    };
    fetchProvinces();
  }, []);
  return (
    <ul className="grid grid-cols-2 gap-2 col-span-5 bg-white p-5 rounded-md w-full">
      {provinces.map((province) => (
        <li>
          <Button onClick={() => setSelectedProvinceId(province.id)}>
            {province.provinceName}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default ButtonList;
