const isValidJWT = (token) => {
  if (typeof token !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [header, payload, signature] = parts;
  if (!header || !payload || !signature) return false;

  try {
    JSON.parse(atob(header));
    JSON.parse(atob(payload));
  } catch (error) {
    return false;
  }

  return true;
};

export default isValidJWT;
