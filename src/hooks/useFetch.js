const useFetch = (endpoint) => {
    const defaultHeader = () => {
        return {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionStorage.getItem("kc-token"),
        };
    }
    const customFetch = (
        url,
        method = "GET",
        body = false,
        headers = defaultHeader()
    ) => {
        const options = {
            method,
            headers
        };
        if (body) options.body = JSON.stringify(body);
        return fetch(url, options)
            .catch(err => {
                throw new Error(err);
            });
    };
    const get = id => {
        const url = `${endpoint}${id ? `/${id}` : "/?page=0&size=100"}`;
        return customFetch(url)
            .then(response => response.json());
    };
    const post = (body = false) => {
        if (!body) throw new Error("to make a post you must provide a     body");
        return customFetch(endpoint+"/", "POST", body)
            .then(response => response.text());
    };
    const put = (id = false, body = false) => {
        if (!id || !body)
            throw new Error("to make a put you must provide the id and the   body");
        const url = `${endpoint}/${id}`;
        return customFetch(url, "PUT", body)
            .then(response => response.json());
    };
    const del = (id = false) => {
        if (!id)
            throw new Error("to make a delete you must provide the id and the body");
        const url = `${endpoint}/${id}`;
        return customFetch(url, "DELETE");
    };
    const search = (query) => {
        const url = `${endpoint}/search?query=${query}`;
        return customFetch(url, "GET")
            .then(response => response.json());
    }
    return {
        get,
        post,
        put,
        del,
        search
    };
};

export default useFetch;