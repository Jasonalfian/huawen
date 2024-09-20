import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Layout from "@/components/layout";

export default function Home() {
  return (
    <Layout isLandingPage>
      <div className="flex flex-col items-center justify-center gap-4 h-[60vh]">
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
          type="password"
        />

        <Button className="mt-2">Submit</Button>
      </div>
    </Layout>
  );
}
