export const handleErrors = (response) => {
    if (!response.status.ok) {
        throw new Error(response.statusText)
    }
    return response
};