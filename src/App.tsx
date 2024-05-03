import { useEffect, useState } from "react";
import "./App.css";
import { Axios } from "./api/axios";
import Card from "./components/Card";
import bg from "./assets/img/bg_battle.png";
import { API_URL } from "./constants";

interface Pokemon {
  name: string;
  url: string;
}

interface Attacker {
  name: string;
  image: {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
  };
  stats: number;
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>();
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [attacker, setAttacker] = useState<Attacker>();
  const [boss, setBoss] = useState<Attacker>();
  const [defaultText, setDefaultText] = useState<string | undefined>("");
  const [isHover, setIsHover] = useState<boolean>(false);

  const fetchPokemon = async () => {
    const data: Pokemon[] = await Axios.get("?limit=100&offset=0")
      .then((res) => res.data)
      .then((res) => res.results);
    setPokemon(data);
  };

  const fetchBoss = async () => {
    const data = await Axios.get(API_URL + `/ditto`)
      .then((res) => res.data)
      .then((res) => res);

    setBoss({
      name: data.name,
      image: data.sprites.other.showdown,
      stats: data.stats[0].base_stat,
      abilities: data.abilities,
    });
  };

  useEffect(() => {
    setDefaultText(attacker?.name);
    setIsHover(false);
  }, [attacker]);

  useEffect(() => {
    fetchPokemon();
    fetchBoss();
  }, []);

  return (
    <div className="w-full ">
      <div>
        <img src={bg} className=" h-full w-full absolute left-0 -z-10" alt="" />
      </div>
      <div className=" flex justify-end p-5">
        <div>
          <div
            onClick={() => setDropDown(!dropDown)}
            className=" cursor-pointer"
          >
            <div className="flex justify-center  shadow-md bg-white cursor-pointer  rounded-md  w-[18rem]">
              {defaultText != undefined ? (
                <div className=" flex ">
                  <img
                    height="10"
                    width="60"
                    src={attacker?.image.front_default}
                    alt=""
                  />
                  <div className=" flex justify-center flex-col">
                    <h4 className=" font-mono text-xl font-bold">
                      {defaultText}
                    </h4>
                  </div>
                </div>
              ) : (
                <h4 className=" px-4 py-2 font-mono text-xl font-bold">
                  เลือก Pokemon
                </h4>
              )}
            </div>
          </div>
          {dropDown && (
            <div
              className={` h-80 overflow-y-scroll absolute w-[18rem] z-20 mt-5`}
            >
              {pokemon?.map((item, key) => {
                return (
                  <Card
                    key={key}
                    name={item.name}
                    setDropDown={setDropDown}
                    setAttacker={setAttacker}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* button fight */}
      <div
        onClick={() => setIsHover(!isHover)}
        className=" h-24 right-[29rem] bottom-[8rem]  w-[26rem] z-40 absolute cursor-pointer"
      ></div>

      <div className=" absolute  bottom-[15rem] right-[29rem] ">
        {isHover &&
          attacker?.image.back_default &&
          attacker?.abilities?.map((item) => {
            return (
              <div
                onClick={() => alert("ปิ้ว! ปิ้ว!")}
                className="p-5 bg-white w-[25rem] my-2 cursor-pointer rounded-md shadow-md hover:bg-red-500 hover:text-white flex justify-center items-center"
              >
                <h4 className=" font-mono  text-xl font-bold rounded-md  ">
                  {item.ability.name}
                </h4>
              </div>
            );
          })}
      </div>

      <div>
        <div>
          <div>
            {boss?.image.front_default && (
              <img
                src={boss?.image.front_default}
                alt=""
                height="100"
                width="300"
                className="absolute mt-[9rem]  right-56 z-10"
              />
            )}
          </div>
        </div>
        <div>
          {attacker?.image.back_default && (
            <img
              src={attacker?.image.back_default}
              alt=""
              height="100"
              width="300"
              className="absolute mt-[22rem] ml-[8rem] z-50"
            />
          )}
        </div>
      </div>

      <div className=" absolute bottom-12">
        <h1 className="text-[#4a4f52] font-serif ml-[7rem] font-bold text-[2.5rem]">
          {attacker?.name}
        </h1>
      </div>
      <div className=" absolute top-[9rem] ">
        <h1 className=" text-[#4a4f52] font-serif ml-[1rem] font-bold text-[2rem]">
          {attacker?.name}
        </h1>
      </div>
      <div className=" absolute top-28 ">
        <h1 className="text-[#4a4f52] font-serif ml-[25rem] font-bold text-[3rem]">
          {attacker?.stats}
        </h1>
      </div>

      <div className=" absolute bottom-[24.5rem]  right-[34rem]">
        <h1 className="text-[#4a4f52] font-serif  font-bold text-[2.5rem]">
          {boss?.name}
        </h1>
      </div>
      <div className=" absolute bottom-[25rem]  right-[14rem] ">
        <h1 className="text-[#4a4f52] font-serif ml-[25rem] font-bold text-[3rem]">
          {boss?.stats}
        </h1>
      </div>
    </div>
  );
}

export default App;
