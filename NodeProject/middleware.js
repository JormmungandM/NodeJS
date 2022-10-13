export default function timeFix(req, res, next) {
  req.valueTime = Date.now();
  console.log(req.valueTime);
  next();
}
