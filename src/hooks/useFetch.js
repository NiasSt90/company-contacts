const useFetch = (endpoint, authTokenStore) => {
    const tokenStore = authTokenStore;
    const defaultHeader = () => {
        return {
            Accept: "application/json, text/plain",
            "Authorization": "Bearer " + tokenStore.token,
            "Access-Control-Request-Headers": "content-disposition"
        };
    }
    const customFetch = (
        url,
        method = "GET",
        body = false,
        type = "application/json",
        headers = defaultHeader()
    ) => {
        const options = {
            method,
            headers
        };
        if (body) {
            options.body = type === "application/json" ? JSON.stringify(body) : body;
            if (type) {//kein Content-Type setzen für Dateiupload aus Javascript
                options.headers["Content-Type"] = type;
            }
        }
        return fetch(url, options)
            .catch(err => {
                throw new Error(err);
            });
    };

    const index = (page = {page: 0, size:10}) => {
        const url = `${endpoint}/?page=${page.page}&size=${page.size}`;
        return customFetch(url)
              .then(response => response.json());
    }

    const get = id => {
        const url = `${endpoint}${id ? `/${id}` : "/?page=0&size=100"}`;
        return customFetch(url)
            .then(response => response.json());
    };

    const post = (body = false, type = "application/json") => {
        if (!body) throw new Error("to make a post you must provide a body");
        return customFetch(endpoint+"/", "POST", body, type)
              .then(response => response.status !== 200 ? response.json() : response.text());
    };

    const download = id => {
        if (!id) Promise.reject("to make a download you must provide the id");
        const url = `${endpoint}/${id}`;
        return customFetch(url)
              .then(async res => ({
                  filename: extractFilename(res.headers.get('content-disposition')),
                  success: res.ok,
                  blob: await res.blob()
              }))
              .then(data => new Promise((resolve, reject) => {
                  if (!data.success) {
                      reject(data.blob());
                  }
                  else {
                      let fileUrl = window.URL.createObjectURL(data.blob);
                      //window.location.assign(fileUrl);
                      let link = document.createElement('a');
                      link.href = fileUrl;
                      link.target = "_blank";
                      link.download = data.filename;
                      link.click();
                      // For Firefox it is necessary to delay revoking the ObjectURL.
                      setTimeout(() => {
                          window.URL.revokeObjectURL(fileUrl);
                      }, 250);
                      resolve(true);
                  }
              }))
    };

    const upload = (body = false) => {
        if (!body) throw new Error("to make an upload you must provide the file data");
       return customFetch(endpoint+"/", "POST", body, null)
            .then(async response => {
                      if (response.ok) {
                          return response.text();
                      }
                      throw new Error(await response.text());
                  });
    };

    const put = (id = false, body = false) => {
        if (!id || !body)
            throw new Error("to make a put you must provide the id and the body");
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

    const search = (query, pagination= {page: 0, size: 10}) => {
        const url = `${endpoint}/search?query=${query}&page=${pagination.page}&size=${pagination.size}`;
        return customFetch(url, "GET")
            .then(response => response.json());
    }
    return {
        index,
        get,
        download,
        post,
        upload,
        put,
        del,
        search
    };
};

function extractFilename(header) {
    if (!header) return "download";
    let filename = header.match(/(attachment|inline);\s*filename="([^"]+)"/i);
    if (filename.length === 3) {
        return filename[2];
    }
    return "download";
}

export default useFetch;