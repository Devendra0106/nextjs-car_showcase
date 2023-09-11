"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchManufacturer from "./SearchManufacturer";
import Image from "next/image";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
	<button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
		<Image
			src="/magnifying-glass.svg"
			alt="magnifying_glass"
			width={40}
			height={40}
			className="object-contain"
		/>
	</button>
);

const SearchBar = () => {
	const [manufacturer, setManufacturer] = useState("");
	const [model, setModal] = useState("");
	const router = useRouter();

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (manufacturer === "" && model === "") {
			return alert("Please fill in search bar");
		}
		console.log(
			"handleSearch-->man",
			manufacturer,
			"handleSearch-->model",
			model
		);
		updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
	};

	const updateSearchParams = (model: string, manufacturer: string) => {
		const searchParams = new URLSearchParams(window.location.search);
		if (model) {
			searchParams.set("model", model);
		} else {
			searchParams.delete("model");
		}

		if (manufacturer) {
			searchParams.set("model", manufacturer);
		} else {
			searchParams.delete("model");
		}

		const newPathname = `${
			window.location.pathname
		}?${searchParams.toString()}`;

		router.push(newPathname);
	};

	return (
		<form className="searchbar" onSubmit={handleSearch}>
			<div className="searchbar__item">
				<SearchManufacturer
					manufacturer={manufacturer}
					setManufacturer={setManufacturer}
				/>
				<SearchButton otherClasses="sm:hidden" />
			</div>

			<div className="searchbar__item">
				<Image
					src="/model-icon.png"
					alt="model-icon"
					width={25}
					height={25}
					className="absolute w-[20px] h-[20px] ml-4"
				/>
				<input
					type="text"
					name="model"
					value={model}
					onChange={(e) => setModal(e.target.value)}
					placeholder="Tiguan"
					className="searchbar__input"
				/>
				<SearchButton otherClasses="sm:hidden" />
			</div>
			<SearchButton otherClasses="max-sm:hidden" />
		</form>
	);
};

export default SearchBar;
