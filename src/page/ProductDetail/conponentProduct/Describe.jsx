import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useRef, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
const useStyles = makeStyles((theme) => ({
  backgroundColor: {
    background: theme.backgroundColor.primary,
  },
  textColor: {
    color: theme.palette.secondary.main,
  },
  wrapDes: {
    padding: "10px",
    "&.js-hidden-content": {
      "&::after": {
        background: theme.backgroundColor.gradientMore,
      },
    },
  },
}));
export default function Describe() {
  const classes = useStyles();

  const blogCt = useRef();

  const [toLongContent, setToLongContent] = useState(false);

  const [more, setMore] = useState(false);

  useEffect(() => {
    if (blogCt.current.offsetHeight > 1000) {
      setMore(true);
      setToLongContent(true);
    }
  }, []);

  const handleToggleContent = () => {
    setToLongContent((prev) => {
      if (prev === false) {
        blogCt.current.scrollIntoView({ behavior: "smooth" });
      }
      return !prev;
    });
  };

  return (
    <Box ref={blogCt} className={`describe-product ${classes.backgroundColor}`}>
      <Typography sx={{ padding: "10px 10px 0" }} className="h-product">
        Mô tả
      </Typography>
      <Box
        className={`wrap-des ${classes.wrapDes} ${
          toLongContent && "js-hidden-content"
        }`}
      >
        <Typography component={"div"}>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem
            sit maxime id, velit optio repellat nulla porro quam ipsum. Beatae
            enim veritatis ut accusamus excepturi odio molestias dolorem ducimus
            rerum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in
            semper mauris, non fringilla ante. Mauris dictum suscipit ex, ac
            efficitur velit mattis id. Interdum et malesuada fames ac ante ipsum
            primis in faucibus. Praesent sodales, sem vitae luctus fermentum,
            lacus arcu ornare nulla, eu elementum turpis mi non turpis. Quisque
            justo tortor, feugiat et feugiat at, bibendum vitae quam. Nulla
            vitae lorem erat. Fusce sollicitudin, ligula vel ultricies euismod,
            purus sapien tincidunt lacus, a ullamcorper velit leo in risus.
            Etiam porttitor odio commodo libero tempor, ac posuere elit
            molestie. Donec gravida dictum lorem ac finibus. Integer rhoncus dui
            ipsum. Donec velit diam, rhoncus at lobortis ac, congue tristique
            mi. Etiam neque mauris, interdum non nisl eu, luctus tincidunt ex.
            Sed fermentum tempor lacus eu dapibus. Donec in urna id tortor
            imperdiet accumsan.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem
            sit maxime id, velit optio repellat nulla porro quam ipsum. Beatae
            enim veritatis ut accusamus excepturi odio molestias dolorem ducimus
            rerum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in
            semper mauris, non fringilla ante. Mauris dictum suscipit ex, ac
            efficitur velit mattis id. Interdum et malesuada fames ac ante ipsum
            primis in faucibus. Praesent sodales, sem vitae luctus fermentum,
            lacus arcu ornare nulla, eu elementum turpis mi non turpis. Quisque
            justo tortor, feugiat et feugiat at, bibendum vitae quam. Nulla
            vitae lorem erat. Fusce sollicitudin, ligula vel ultricies euismod,
            purus sapien tincidunt lacus, a ullamcorper velit leo in risus.
            Etiam porttitor odio commodo libero tempor, ac posuere elit
            molestie. Donec gravida dictum lorem ac finibus. Integer rhoncus dui
            ipsum. Donec velit diam, rhoncus at lobortis ac, congue tristique
            mi. Etiam neque mauris, interdum non nisl eu, luctus tincidunt ex.
            Sed fermentum tempor lacus eu dapibus. Donec in urna id tortor
            imperdiet accumsan.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem
            sit maxime id, velit optio repellat nulla porro quam ipsum. Beatae
            enim veritatis ut accusamus excepturi odio molestias dolorem ducimus
            rerum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in
            semper mauris, non fringilla ante. Mauris dictum suscipit ex, ac
            efficitur velit mattis id. Interdum et malesuada fames ac ante ipsum
            primis in faucibus. Praesent sodales, sem vitae luctus fermentum,
            lacus arcu ornare nulla, eu elementum turpis mi non turpis. Quisque
            justo tortor, feugiat et feugiat at, bibendum vitae quam. Nulla
            vitae lorem erat. Fusce sollicitudin, ligula vel ultricies euismod,
            purus sapien tincidunt lacus, a ullamcorper velit leo in risus.
            Etiam porttitor odio commodo libero tempor, ac posuere elit
            molestie. Donec gravida dictum lorem ac finibus. Integer rhoncus dui
            ipsum. Donec velit diam, rhoncus at lobortis ac, congue tristique
            mi. Etiam neque mauris, interdum non nisl eu, luctus tincidunt ex.
            Sed fermentum tempor lacus eu dapibus. Donec in urna id tortor
            imperdiet accumsan.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem
            sit maxime id, velit optio repellat nulla porro quam ipsum. Beatae
            enim veritatis ut accusamus excepturi odio molestias dolorem ducimus
            rerum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in
            semper mauris, non fringilla ante. Mauris dictum suscipit ex, ac
            efficitur velit mattis id. Interdum et malesuada fames ac ante ipsum
            primis in faucibus. Praesent sodales, sem vitae luctus fermentum,
            lacus arcu ornare nulla, eu elementum turpis mi non turpis. Quisque
            justo tortor, feugiat et feugiat at, bibendum vitae quam. Nulla
            vitae lorem erat. Fusce sollicitudin, ligula vel ultricies euismod,
            purus sapien tincidunt lacus, a ullamcorper velit leo in risus.
            Etiam porttitor odio commodo libero tempor, ac posuere elit
            molestie. Donec gravida dictum lorem ac finibus. Integer rhoncus dui
            ipsum. Donec velit diam, rhoncus at lobortis ac, congue tristique
            mi. Etiam neque mauris, interdum non nisl eu, luctus tincidunt ex.
            Sed fermentum tempor lacus eu dapibus. Donec in urna id tortor
            imperdiet accumsan.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem
            sit maxime id, velit optio repellat nulla porro quam ipsum. Beatae
            enim veritatis ut accusamus excepturi odio molestias dolorem ducimus
            rerum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in
            semper mauris, non fringilla ante. Mauris dictum suscipit ex, ac
            efficitur velit mattis id. Interdum et malesuada fames ac ante ipsum
            primis in faucibus. Praesent sodales, sem vitae luctus fermentum,
            lacus arcu ornare nulla, eu elementum turpis mi non turpis. Quisque
            justo tortor, feugiat et feugiat at, bibendum vitae quam. Nulla
            vitae lorem erat. Fusce sollicitudin, ligula vel ultricies euismod,
            purus sapien tincidunt lacus, a ullamcorper velit leo in risus.
            Etiam porttitor odio commodo libero tempor, ac posuere elit
            molestie. Donec gravida dictum lorem ac finibus. Integer rhoncus dui
            ipsum. Donec velit diam, rhoncus at lobortis ac, congue tristique
            mi. Etiam neque mauris, interdum non nisl eu, luctus tincidunt ex.
            Sed fermentum tempor lacus eu dapibus. Donec in urna id tortor
            imperdiet accumsan.
          </p>
        </Typography>
      </Box>
      {more && (
        <Typography
          component={"div"}
          className="more_"
          onClick={() => handleToggleContent()}
        >
          {toLongContent === true ? (
            <>
              Xem thêm
              <ArrowDropDownIcon />
            </>
          ) : (
            <>
              Dóng lại
              <ArrowDropUpIcon />
            </>
          )}
        </Typography>
      )}
    </Box>
  );
}
