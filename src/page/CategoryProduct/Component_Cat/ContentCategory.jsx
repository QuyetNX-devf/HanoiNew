import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useEffect, useRef, useState } from "react";
import { memo } from "react";

const useStyles = makeStyles((theme) => ({
  bgContent: {
    background: theme.backgroundColor.blackWhite,
    "&.js-hidden-content": {
      "&::after": {
        background: theme.backgroundColor.gradientMore,
      },
    },
  },
  btnMore: {
    background: theme.backgroundColor.blackWhite,
  },
}));
function ContentCategory() {
  const blogCt = useRef();
  const classes = useStyles();

  const [toLongContent, setToLongContent] = useState(false);

  useEffect(() => {
    if (blogCt.current.offsetHeight > 1500) setToLongContent(true);
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
    <>
      <Box className="Block-detail">
        <Grid container spacing={"15px"}>
          <Grid item xs={0} mmd={2.5}></Grid>
          <Grid item xs={12} mmd={9.5}>
            <Box
              ref={blogCt}
              className={`Wrap-ct-detail ${
                toLongContent && "js-hidden-content"
              } ${classes.bgContent}`}
            >
              <Typography component={"div"}>
                <div
                  className={`${classes.wrapText}`}
                  style={{ fontWeight: "normal" }}
                >
                  <p style={{ textAlign: "justify" }}>
                    Cùng với những bộ phận khác, linh kiện máy tính là một phần
                    không thể thiếu để đảm bảo chiếc máy tính của bạn có thể
                    hoạt động. Để tìm hiểu kỹ hơn về một số linh kiện máy tính
                    quan trọng và địa chỉ cung cấp linh kiện đảm bảo an toàn,
                    chất lượng, Hanoinew sẽ giúp bạn tìm hiểu chi tiết.
                  </p>
                  <h2 style={{ textAlign: "justify" }}>
                    1. Linh kiện máy tính là gì?
                  </h2>
                  <p style={{ textAlign: "justify" }}>
                    Linh kiện - phụ kiện máy tính là những bộ phận chủ yếu cấu
                    tạo nên một chiếc máy tính hoàn chỉnh. Khi một chiếc máy
                    tính đầy đủ các linh phụ kiện mới có thể hoạt động và thực
                    hiện các thao tác của người sử dụng. Chính vì vậy, linh kiện
                    có thể được xem là thành phần đầu não, một trong những bộ
                    phận quan trọng nhất để tạo nên một chiếc máy chính hoàn
                    thiện về chức năng.
                  </p>
                  <p style={{ textAlign: "justify" }}>
                    Một máy tính có các linh kiện đạt chuẩn sẽ đảm bảo độ bền
                    sau một thời gian dài sử dụng cũng như trải nghiệm của người
                    dùng. Khi mua linh kiện, phụ kiện pc bạn cũng cần hết sức
                    chú ý để có thể đảm bảo hiệu năng kiểm soát của máy.&nbsp;
                  </p>
                  <h2 style={{ textAlign: "justify" }}>
                    2. Một số linh kiện máy tính chủ yếu
                  </h2>
                  <h3 style={{ textAlign: "justify" }}>
                    2.1. Central Processing Unit (CPU)
                  </h3>
                  <p style={{ textAlign: "justify" }}>
                    Một linh kiện vô cùng quan trọng đầu tiên có thể nhắc tới mà
                    không một chiếc máy tình nào không có đó chính là{" "}
                    <span style={{ color: "#0000ff" }}>
                      <a
                        style={{ color: "#0000ff" }}
                        href="https://hanoinew.vn/cpu-bo-vi-xu-ly"
                        target="_blank"
                      >
                        <strong>CPU.</strong>
                      </a>
                    </span>{" "}
                    CPU là một bộ chip xử lý của máy tính, được ví như đầu não
                    của máy tính khi nó có thể chi phối và xử lý các thông tin
                    từ input. Những thông tin muốn được thể hiện lên trên màn
                    hình đều cần phải có sự xử lý của CPU, do đó nếu như CPU
                    không đảm bảo thì chiếc máy tính của bạn cũng sẽ gặp vấn đề
                    khi sử dụng.
                  </p>
                  <p style={{ textAlign: "justify" }}>
                    CPU cũng quyết định tốc độ xử lý thông tin của pc - laptop.
                    Điều này là một trong những yếu tố quyết định giá thành của
                    một chiếc máy tính mà bạn. Đồng thời, CPU cũng cần phải
                    tương thích với bo mạch chủ (main) mới có thể hoạt động một
                    cách bình thường. Trên thị trường hiện nay có rất nhiều dòng
                    CPU từ thấp đến cao tùy theo giá tiền đắt hay rẻ, phổ biến
                    nhất có thể kể đến core i3, i5, i7,...
                  </p>
                  <h3 style={{ textAlign: "justify" }}>
                    2.2. Random Access Memory (RAM)
                  </h3>
                  <p style={{ textAlign: "justify" }}>
                    <span style={{ color: "#0000ff" }}>
                      <a
                        style={{ color: "#0000ff" }}
                        href="https://hanoinew.vn/ram-bo-nho-trong"
                        target="_blank"
                      >
                        <strong>Random Access Memory</strong>
                      </a>
                    </span>{" "}
                    hay còn gọi là bộ nhớ tạm thời, được xếp vào một trong các
                    linh kiện máy tính quan trọng nhất. Sau khi CPU xử lý nguồn
                    thông tin, thông tin đó sẽ được lưu trữ tạm thời trên ram và
                    trích xuất qua output. RAM cũng ảnh hưởng vô cùng lớn đến
                    tốc độ xử lý của máy. Nếu như một chiếc máy tính RAM yếu sẽ
                    dễ xảy ra tình trạng giật, lag, đơ trong quá trình sử dụng,
                    ảnh hưởng không nhỏ đến trải nghiệm người dùng.&nbsp;
                  </p>
                  <p style={{ textAlign: "justify" }}>
                    Khi lựa chọn RAM, nhà sản xuất cũng dựa vào main để chọn lựa
                    sao cho tương thích. Hầu hết các sản phẩm laptop hiện nay
                    trên thị trường đều được gắn thanh ram 4GB có hỗ trợ lắp
                    ngoài. Do đó tùy vào nhu cầu sử dụng cá nhân trong công việc
                    và giải trí, bạn cũng có thể nâng cấp bằng các thanh RAM qua
                    khe lắp.
                  </p>
                  <h3 style={{ textAlign: "justify" }}>
                    2.3. Main (bo mạch chủ)
                  </h3>
                  <p style={{ textAlign: "justify" }}>
                    Nếu như CPU được xem là bộ não thì main được ví như khung
                    xương, quyết định tốc độ nhanh chậm của thiết bị đó. Main có
                    vai trò là kết nối các bộ phận, bao gồm cả phần cứng và phần
                    mềm với nhau thành một chỉnh thể hoàn chỉnh để máy có thể
                    vận hành.&nbsp;
                  </p>
                  <p style={{ textAlign: "justify" }}>
                    Dựa theo các thông số kỹ thuật được ghi trên main máy tính
                    mà linh kiện này có thể tương thích với một số linh kiện máy
                    tính khác. Hầu hết các bo mạch chủ đều được tích hợp các
                    thiết bị xử lý hình ảnh, âm thanh, mạng, các CPU không cùng
                    chân cắm nhưng khả năng xử lý cao vẫn có thể sử dụng tốt nên
                    bạn không cần quá lo lắng.
                  </p>
                  <h3 style={{ textAlign: "justify" }}>2.4. Ổ cứng</h3>
                  <p style={{ textAlign: "justify" }}>
                    Có hai loại ổ cứng chủ yếu đó chính là HDD và SSD. Nếu như
                    RAM là bộ nhớ lưu trữ tạm thời thì ổ cứng là linh kiện máy
                    tính nhằm mục đích lưu trữ dữ liệu nhập đầu vào. Thông tin
                    được sao lưu trên ổ cứng sẽ được lưu trữ vĩnh viễn cho đến
                    khi ổ cứng bị hỏng hoặc máy tính gặp trục trặc. Bởi vì ổ
                    cứng lưu trữ tất cả các data trong máy tính nên dung lượng
                    cũng là một điều mà chúng ta cần phải quan tâm nhiều
                    nhất.&nbsp;
                  </p>
                  <p style={{ textAlign: "justify" }}>
                    Thông thường máy tính sẽ được cài ổ cứng từ 500GB đến 1T,
                    nếu vượt qua con số này thì bạn phải bỏ ra số tiền không hề
                    nhỏ. Do đó nếu như bạn có nhu cầu lưu trữ số lượng lớn, có
                    thể lắp thêm đĩa SSD để nâng cấp bộ nhớ của thiết bị. Đặc
                    biệt đối với những người có nhu cầu xử lý data lớn thì nâng
                    cấp bộ nhớ nhờ SSD chính là một lựa chọn hoàn toàn thông
                    minh và phù hợp.&nbsp;
                  </p>
                  <h3 style={{ textAlign: "justify" }}>
                    2.5. VGA đồ họa (card màn hình)
                  </h3>
                  <p style={{ textAlign: "justify" }}>
                    VGA đồ họa hay còn gọi là card màn hình là một thiết bị xử
                    lý hình ảnh từ CPU lên desktop. VGA có hai loại bao gồm là
                    VGA đồ họa liền và VGA đồ họa rời. Loại VGA liền được tích
                    hợp kèm với máy, hỗ trợ thực hiện các thao tác văn phòng,
                    soạn thảo văn bản và một số công cụ đơn giản khác. Với card
                    màn hình rời thường được bán riêng tại các cửa hàng linh
                    kiện máy tính. Đây là VGA đồ họa nhằm mục đích xử lý các tác
                    vụ nặng, phù hợp với gaming và những người làm trong lĩnh
                    vực edit, thiết kế.
                  </p>
                  <h3 style={{ textAlign: "justify" }}>
                    2.6. Power Supply (bộ nguồn - PSU)
                  </h3>
                  <p style={{ textAlign: "justify" }}>
                    Bộ nguồn là một linh kiện máy tính thường được sử dụng cho
                    máy tính bàn (PC). Nó đóng vai trò vô cùng quan trọng nhưng
                    lại bị nhiều người vô tình bỏ qua do chủ quan. Một máy tính
                    sở hữu bộ nguồn đảm bảo sẽ nâng cao hiệu suất làm việc, tuổi
                    thọ của máy và ít bị hư hại hơn khi sử dụng. Ngược lại, bộ
                    nguồn PSU không đảm bảo sẽ khiến máy nhanh hỏng, chậm,
                    giật.&nbsp;
                  </p>
                  <p style={{ textAlign: "justify" }}>
                    Bộ nguồn có chức năng chuyển hóa dòng điện xoay chiều từ
                    mạng điện gia đình (AC) thành dòng điện một chiều (DC) để
                    cung cấp cho máy tính. Nếu như dòng điện quá mạnh sẽ khiến
                    máy tính bị hỏng, nếu dòng điện quá yếu sẽ không đảm bảo
                    điện năng và dẫn đến các linh kiện khác bên trong máy tính
                    bị hỏng hóc do chập chờn. Một trong những dấu hiệu tiêu biểu
                    cho thấy dòng điện yếu đó chính là máy tính liên tục
                    restart, không thể khởi động lên được.&nbsp;
                  </p>
                  <h2 style={{ textAlign: "justify" }}>
                    3. Hanoinew - đơn vị cung cấp linh kiện máy tính uy tín,
                    chất lượng
                  </h2>
                  <p style={{ textAlign: "justify" }}>
                    Hiện nay, các linh phụ kiện dành cho pc - desktop bạn có thể
                    dễ dàng mua tại các cửa hàng mua - bán linh kiện máy tính.
                    Tuy nhiên cần lưu ý đây là những sản phẩm điện tử, bạn cần
                    chú ý chọn lựa các sản phẩm đến từ những hãng sản xuất có
                    tên tuổi tại các đơn vị uy tín, chất lượng.
                  </p>
                  <p style={{ textAlign: "justify" }}>
                    <span style={{ color: "#0000ff" }}>
                      <a
                        style={{ color: "#0000ff" }}
                        href="https://hanoinew.vn/"
                        target="_blank"
                      >
                        <strong>Hanoinew</strong>
                      </a>
                    </span>{" "}
                    là một đơn vị chuyên cung cấp linh kiện máy tính đảm bảo
                    chất lượng, cam kết 100% là linh kiện mới. Với kinh nghiệm
                    nhiều năm trong lĩnh vực buôn bán, phân phối linh kiện điện
                    tử, đây chính là đơn vị bạn hoàn toàn có thể yên tâm khi
                    chọn mua các sản phẩm và sử dụng dịch vụ tại đây. Hanoinew
                    xin cam kết với khách hàng:
                  </p>
                  <ul style={{ textAlign: "justify" }}>
                    <li>
                      Giá cả phải chăng, sản phẩm với nhiều mức giá cho khách
                      hàng lựa chọn tùy theo nhu cầu
                    </li>
                    <li>
                      Linh kiện zin 100%, cam kết đổi trả nếu xảy ra hỏng hóc từ
                      nhà sản xuất
                    </li>
                    <li>Có chế độ bảo hành</li>
                    <li>Hỗ trợ lắp đặt, sửa chữa</li>
                  </ul>
                  <p style={{ textAlign: "justify" }}>
                    Linh kiện máy tính mặc dù chỉ là một bộ phận nhỏ nhưng có
                    vai trò vô cùng lớn trong việc điều hành và giúp máy tính
                    hoạt động. Qua những chia sẻ của Hanoinew, các bạn đã nắm rõ
                    hơn vị trí, chức năng của từng linh kiện, hi vọng những
                    thông tin đó sẽ giúp ích cho bạn trong việc chọn mua thiết
                    bị theo nhu cầu của mình.
                  </p>
                  <p
                    style={{
                      lineHeight: "1.7999999999999998",
                      textAlign: "justify",
                      marginTop: "0pt",
                      marginBottom: "0pt",
                    }}
                  >
                    <br />
                    <br />
                  </p>
                </div>
              </Typography>
            </Box>
            <Typography
              component={"div"}
              className={`more_ ${classes.btnMore}`}
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
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default memo(ContentCategory);
