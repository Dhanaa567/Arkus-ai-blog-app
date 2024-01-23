import { RingLoader } from "react-spinners";
import { styled } from "@mui/material/styles";
export default function Spinner(props: any) {
  const SpinnerWrapper = styled("div")(({ theme }) => ({
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    height: "100%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: "999",
  }));

  const Spinner = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 300,
  }));

  return (
    <SpinnerWrapper>
      <Spinner>
        <RingLoader
          color={"#1976d2"}
          loading={props?.loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </Spinner>
    </SpinnerWrapper>
  );
}
