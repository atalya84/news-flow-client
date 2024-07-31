export type Weather = {
	current: {
		date: string;
		description: string;
		icon: any;
		temperature: string;
		wind: string;
		humidity: string;
	};
};

export type GeoData = {
    name: string;
    local_names: Record<string, string>;
    lat: string;
    lon: string;
    country: string;
    state: string;
};
