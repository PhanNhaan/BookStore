import React from 'react';
import { Box, Typography, Container, Divider } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Box sx={{ backgroundColor: '#f4f6f8', minHeight: '100vh', pt: 8 }}>
      <Container maxWidth="md" sx={{ backgroundColor: '#ffffff', p: 4, borderRadius: 2, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold', color: '#2e7d32' }}>
          Chính Sách Bảo Mật
        </Typography>
        <Divider sx={{ mb: 4 }} />

        <Typography variant="h6" sx={{ mb: 2 }}>
          1. Thu thập thông tin cá nhân
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Chúng tôi thu thập thông tin cá nhân của bạn khi bạn đăng ký tài khoản, mua hàng, hoặc tương tác với trang web của chúng tôi. Các thông tin bao gồm tên, địa chỉ email, số điện thoại, và địa chỉ giao hàng.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2 }}>
          2. Sử dụng thông tin
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Chúng tôi sử dụng thông tin cá nhân của bạn để cung cấp dịch vụ, xử lý đơn hàng, hỗ trợ khách hàng, và cải thiện trải nghiệm của bạn trên trang web của chúng tôi.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2 }}>
          3. Chia sẻ thông tin
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Chúng tôi cam kết không chia sẻ thông tin cá nhân của bạn với bên thứ ba, ngoại trừ trường hợp được yêu cầu bởi pháp luật hoặc khi cần thiết để hoàn thành dịch vụ mà bạn đã yêu cầu.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2 }}>
          4. Bảo mật thông tin
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Chúng tôi áp dụng các biện pháp bảo mật cần thiết để bảo vệ thông tin cá nhân của bạn khỏi truy cập trái phép, mất mát hoặc thay đổi.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2 }}>
          5. Quyền của bạn
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Bạn có quyền truy cập, sửa đổi hoặc yêu cầu xóa thông tin cá nhân của mình. Nếu bạn có bất kỳ câu hỏi nào về quyền riêng tư của mình, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại hỗ trợ.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2 }}>
          6. Thay đổi chính sách
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Chúng tôi có quyền cập nhật chính sách bảo mật này bất kỳ lúc nào. Mọi thay đổi sẽ được thông báo trên trang web này. Vui lòng kiểm tra thường xuyên để đảm bảo bạn hiểu rõ về các thay đổi này.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2 }}>
          7. Liên hệ
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào về chính sách bảo mật, vui lòng liên hệ với chúng tôi qua email tại support@bookstore.com hoặc số điện thoại 123-456-7890.
        </Typography>

        <Divider sx={{ my: 4 }} />
        <Typography variant="body2" sx={{ textAlign: 'center', color: '#888' }}>
          © 2024 BOOK STORE. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
