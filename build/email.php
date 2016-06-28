<?php
	/*
		such error
                   ▄              ▄
                  ▌▒█           ▄▀▒▌
                  ▌▒▒█        ▄▀▒▒▒▐
                 ▐▄▀▒▒▀▀▀▀▄▄▄▀▒▒▒▒▒▐	wow
               ▄▄▀▒░▒▒▒▒▒▒▒▒▒█▒▒▄█▒▐
             ▄▀▒▒▒░░░▒▒▒░░░▒▒▒▀██▀▒▌
            ▐▒▒▒▄▄▒▒▒▒░░░▒▒▒▒▒▒▒▀▄▒▒▌
            ▌░░▌█▀▒▒▒▒▒▄▀█▄▒▒▒▒▒▒▒█▒▐
           ▐░░░▒▒▒▒▒▒▒▒▌██▀▒▒░░░▒▒▒▀▄▌
           ▌░▒▄██▄▒▒▒▒▒▒▒▒▒░░░░░░▒▒▒▒▌
          ▌▒▀▐▄█▄█▌▄░▀▒▒░░░░░░░░░░▒▒▒▐
          ▐▒▒▐▀▐▀▒░▄▄▒▄▒▒▒▒▒▒░▒░▒░▒▒▒▒▌
          ▐▒▒▒▀▀▄▄▒▒▒▄▒▒▒▒▒▒▒▒░▒░▒░▒▒▐
many error ▌▒▒▒▒▒▒▀▀▀▒▒▒▒▒▒░▒░▒░▒░▒▒▒▌
           ▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒░▒░▒▒▄▒▒▐
            ▀▄▒▒▒▒▒▒▒▒▒▒▒░▒░▒░▒▄▒▒▒▒▌
              ▀▄▒▒▒▒▒▒▒▒▒▒▄▄▄▀▒▒▒▒▄▀
                ▀▄▄▄▄▄▄▀▀▀▒▒▒▒▒▄▄▀
                   ▒▒▒▒▒▒▒▒▒▒▀▀		very cannot user
	*/

	$resonseType = 0;
	if (isset($_GET['response']) && $_GET['response'] == 'json')
		$resonseType = 1;

	// Make sure we are recieveing all the data.
	if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message']) && isset($_POST['g-recaptcha-response'])) {
		$name = strip_tags($_POST['name']);
		$email = strip_tags($_POST['email']);
		$message = strip_tags($_POST['message']);
		$captcha = $_POST['g-recaptcha-response'];

		// Check for first and last name.
		if (empty(trim($name)) || strpos($name, ' ') === false) {
			respond($resonseType, [
				'success' => false,
				'error' => 'Invalid Name'
			]);
		}

		// Validate email address
		if (empty(trim($email)) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
			respond($resonseType, [
				'success' => false,
				'error' => 'Invalid Email'
			]);
		}

		// Validate message
		if (empty(trim($message))) {
			respond($resonseType, [
				'success' => false,
				'error' => 'Invalid Message'
			]);
		}

		// Validate captcha
		$data = [
			'secret' => '6LdpQSITAAAAAF11NYea-l_Nm0oziLvSYxmwGQAC',
			'response' => $captcha,
			'remoteip' => $_SERVER['REMOTE_ADDR']
		];

		$ch = curl_init('https://www.google.com/recaptcha/api/siteverify');
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		$response = curl_exec($ch);
		curl_close($ch);

		$response = json_decode($response);

		if (isset($response->success) && $response->success) {
			$rn = "\r\n";
			$boundary = md5(rand());
			$boundary_content = md5(rand());

			// Send Confirmation Emails
			$confirmationHeaders  = 'MIME-Version: 1.0'.$rn;
			$confirmationHeaders .= 'From: Stephanie Rentfrow <noreply@stephanierentfrow.com>'.$rn;
			$confirmationHeaders .= 'To: '.$name.' <'.$email.'>'.$rn;
			$confirmationHeaders .= 'Content-Type: multipart/alternative;'.$rn;
			$confirmationHeaders .= '	boundary="'.$boundary_content.'"';

			$confirmationMsg .= 'This is a multi-part message in MIME format.'.$rn.$rn;
			$confirmationMsg .= '--'.$boundary_content.$rn;
			$confirmationMsg .= 'Content-Type: text/plain;'.$rn;
			$confirmationMsg .= '	charset="utf-8"'.$rn.$rn;
			$confirmationMsg .= 'Your message has been sent:'.$rn;
			$confirmationMsg .= $message.$rn.$rn;
			$confirmationMsg .= '--'.$boundary_content.$rn;
			$confirmationMsg .= 'Content-Type: text/html;'.$rn;
			$confirmationMsg .= '	charset="utf-8"'.$rn;
			$confirmationMsg .= 'Content-Transfer-Encoding: 8bit'.$rn.$rn;
			$confirmationMsg .= '<!DOCTYPE html>'.$rn;
			$confirmationMsg .= '<html xmlns="http://www.w3.org/1999/xhtml">'.$rn;
			$confirmationMsg .= '<head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><title></title><style type="text/css">p{font-family:Arial;}</style></head>'.$rn;
			$confirmationMsg .= '<body><p>Your message has been sent:</p><p>'.$message.'</p></body>'.$rn;
			$confirmationMsg .= '</html>'.$rn.$rn;
			$confirmationMsg .= '--'.$boundary_content.'--'.$rn;

			mail($email, 'Stephanie Rentfrow - Contact Confirmation', $confirmationMsg, $confirmationHeaders);

			$boundary = md5(rand());
			$boundary_content = md5(rand());

			// Send Confirmation Emails
			$headers  = 'MIME-Version: 1.0'.$rn;
			$headers .= 'From: '.$name.' <'.$email.'>'.$rn;
			$headers .= 'To: Stephanie Rentfrow <sr.lindsey.1989@gmail.com>'.$rn;
			$headers .= 'Content-Type: multipart/alternative;'.$rn;
			$headers .= '	boundary="'.$boundary_content.'"';

			$msg .= 'This is a multi-part message in MIME format.'.$rn.$rn;
			$msg .= '--'.$boundary_content.$rn;
			$msg .= 'Content-Type: text/plain;'.$rn;
			$msg .= '	charset="utf-8"'.$rn.$rn;
			$msg .= $message.$rn.$rn;
			$msg .= '--'.$boundary_content.$rn;
			$msg .= 'Content-Type: text/html;'.$rn;
			$msg .= '	charset="utf-8"'.$rn;
			$msg .= 'Content-Transfer-Encoding: 8bit'.$rn.$rn;
			$msg .= '<!DOCTYPE html>'.$rn;
			$msg .= '<html xmlns="http://www.w3.org/1999/xhtml">'.$rn;
			$msg .= '<head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><title></title><style type="text/css">p{font-family:Arial;}</style></head>'.$rn;
			$msg .= '<body><p>'.$message.'</p></body>'.$rn;
			$msg .= '</html>'.$rn.$rn;
			$msg .= '--'.$boundary_content.'--'.$rn;

			mail($email, 'Website Contact - '.$name, $msg, $headers);

			respond($resonseType, [
				'success' => true
			]);
		} else {
			respond($resonseType, [
				'success' => false,
				'error' => 'Invalid Captcha'
			]);
		}
	} else {
		respond($resonseType, [
			'success' => false,
			'error' => 'Invalid Data'
		]);
	}

	function respond($res, $data) {
		var_dump($res, $data);

		if ($res == 1) {
			header('HTTP/1.1 200 OK');
			header('Content-type: application/json');
			echo json_encode($data);
		} else {
			$query = '?';
			foreach ($data as $key => $value) {
				if (is_bool($value)) {
					$query .= urlencode($key).'='.(($value)?'1&':'0&');
				} else {
					$query .= urlencode($key).'='.urlencode($value).'&';
				}
			}
			$query = substr($query, 0, -1);

			$url = $_SERVER['HTTP_REFERER'];
			$query_start = strpos($url, '?');
			if ($query_start !== false) {
				$url = substr($url, 0, $query_start);
			}

			header('HTTP/1.1 302 Found');
			header('Location: '.$url.$query);
		}

		exit();
	}
?>