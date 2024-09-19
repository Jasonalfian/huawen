import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl font-medium">Login</h1>
      <TextField
        sx={{ width: "300px" }}
        id="outlined-basic"
        label="username"
        variant="outlined"
      />
      <TextField
        sx={{ width: "300px" }}
        id="outlined-basic"
        label="password"
        variant="outlined"
      />

      <Button className="mt-2">Submit</Button>
    </div>
  );
}
