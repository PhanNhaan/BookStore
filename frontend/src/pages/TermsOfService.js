import React from 'react';
import { Box, Container, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

const TermsOfService = () => (
  <Box sx={{ mt: 8, backgroundColor: '#f4f6f8', py: 4, minHeight: '100vh' }}>
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, borderRadius: '12px' }}>
        <Typography
          variant="h4"
          sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold', color: '#2e7d32' }}
        >
          Điều khoản Dịch Vụ
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
          1. Giới thiệu
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Chào mừng bạn đến với BOOK STORE. Khi truy cập vào website của chúng tôi, bạn đồng ý tuân thủ
          các điều khoản sử dụng dưới đây. Vui lòng đọc kỹ trước khi sử dụng dịch vụ của chúng tôi.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
          2. Chấp nhận điều khoản
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Việc bạn truy cập và sử dụng dịch vụ của chúng tôi đồng nghĩa với việc bạn đồng ý với tất cả các
          điều khoản sử dụng, chính sách và các điều kiện quy định. Nếu bạn không đồng ý với bất kỳ điều
          khoản nào, vui lòng ngừng sử dụng website của chúng tôi.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
          3. Quyền và trách nhiệm của người dùng
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Người dùng có trách nhiệm cung cấp thông tin chính xác khi đăng ký tài khoản và cập nhật thông tin khi có thay đổi." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Người dùng không được sử dụng website vào các mục đích vi phạm pháp luật hoặc gây ảnh hưởng đến các người dùng khác." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Mọi hành vi gian lận hoặc gây rối sẽ bị xử lý theo quy định của pháp luật." />
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
          4. Quyền và trách nhiệm của chúng tôi
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Chúng tôi có quyền thay đổi hoặc tạm ngừng cung cấp dịch vụ mà không cần thông báo trước. Chúng
          tôi cam kết bảo mật thông tin cá nhân của người dùng và không chia sẻ cho bên thứ ba nếu không
          có sự đồng ý của người dùng, trừ khi pháp luật yêu cầu.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
          5. Chính sách thanh toán và hoàn tiền
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Chúng tôi chấp nhận các phương thức thanh toán qua thẻ tín dụng, chuyển khoản và các cổng thanh
          toán trực tuyến. Nếu có bất kỳ vấn đề nào liên quan đến việc thanh toán hoặc hoàn tiền, vui lòng
          liên hệ với bộ phận chăm sóc khách hàng của chúng tôi.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
          6. Quyền sở hữu trí tuệ
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Tất cả nội dung trên website (bao gồm hình ảnh, văn bản, logo) thuộc quyền sở hữu của chúng tôi
          và được bảo vệ bởi luật sở hữu trí tuệ. Người dùng không được sao chép, sử dụng mà không có sự
          cho phép.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
          7. Liên hệ
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ liên quan đến điều khoản dịch vụ, vui lòng liên hệ với
          chúng tôi qua:
        </Typography>
        <Typography variant="body1">
          Email: support@bookstore.com<br />
          Điện thoại: 0123-456-789<br />
          Địa chỉ: 123 Ngũ Hành Sơn, Đà Nẵng
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" sx={{ textAlign: 'center', color: '#777', mt: 3 }}>
          Cập nhật lần cuối vào ngày 10/19/2024.
        </Typography>
      </Paper>
    </Container>
  </Box>
);

export default TermsOfService;
