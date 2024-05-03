import { useEffect, useState } from "react";
import { Axios } from "../api/axios";
import { API_URL } from "../constants";

interface Pokemon {
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

interface Props {
  name: string;
  setAttacker: (arg: Pokemon | undefined) => void;
  setDropDown: (arg: boolean) => void;
}

function Card({ name, setAttacker, setDropDown }: Props) {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [isHover, setHover] = useState<boolean>(false);

  const fetchPokemonDetail = async (name: string) => {
    const data = await Axios.get(API_URL + `/${name}`)
      .then((res) => res.data)
      .then((res) => res);

    setPokemon({
      name: data.name,
      image: data.sprites.other.showdown,
      stats: data.stats[0].base_stat,
      abilities: data.abilities,
    });
  };

  useEffect(() => {
    fetchPokemonDetail(name);
  }, [name]);

  return (
    <div
      onClick={() => {
        setAttacker(pokemon);
        setDropDown(false);
      }}
      onMouseEnter={() => setHover(!isHover)}
      onMouseLeave={() => setHover(!isHover)}
      className=" transition ease-in-out delay-75  hover:-translate-y-1 hover:scale-110 duration-100 flex justify-center hover:bg-red-500  shadow-md bg-white px-5 py-2  cursor-pointer  my-2 rounded-md "
    >
      <div className="flex">
        <img height="10" width="60" src={pokemon?.image.front_default} alt="" />
        <div className=" flex justify-center items-center">
          <h4
            className={` font-mono text-xl font-bold ${
              isHover ? "text-white" : "text-black"
            }`}
          >
            {name}
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Card;
