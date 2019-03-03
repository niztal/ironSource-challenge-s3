const validateFileNotDeleted = (file) => {
    if (file.isDeleted) {
        throw {status: 404, message: "file deleted"}
    }
}

export default validateFileNotDeleted;