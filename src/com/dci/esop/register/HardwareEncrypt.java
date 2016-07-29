package com.dci.esop.register;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.UUID;

import org.apache.axiom.om.util.Base64;

import com.dci.esop.config.SFTConfig;
import com.dci.esop.register.RealMachine;
import com.dci.esop.register.VirtualMachine;

public class HardwareEncrypt {
	private static HardwareEncrypt instance = new HardwareEncrypt();

	public static HardwareEncrypt getInstance() {
		return instance;
	}

	SFTConfig sc;
	String guardip;
	String apip;
	int port = 6666;
	String HARDWAREID;
	boolean isvm;

	public String getHARDWAREID() {
		return HARDWAREID;
	}

	public void setHARDWAREID(String HARDWAREID) {
		this.HARDWAREID = HARDWAREID;
	}

	public boolean isIsvm() {
		return isvm;
	}

	public HardwareEncrypt() {
		this("");
	}

	public HardwareEncrypt(String ip) {
		this(ip, "");
	}

	public HardwareEncrypt(String ip, String apipData) {
		sc = new SFTConfig();
		if (ip.equals("")) {
			sc = new SFTConfig();
			this.guardip = sc.getGuardManagerIP();
		} else {
			this.guardip = ip;
		}
		if (apipData.equals("")) {
			this.apip = sc.getGuardManagerNetCard();
		} else {
			this.apip = apipData;
		}
	}

	public String getFakeHardCode() {
		String randomUUIDString = UUID.randomUUID().toString().replace("-", "");
		return randomUUIDString;
	}

	public String encrypt(String ip) throws UnknownHostException, IOException {
		return encrypt(ip, "");
	}

	public String encrypt(String ip, String apipData) throws UnknownHostException, IOException {
		sc = new SFTConfig();
		if (ip.equals("")) {
			sc = new SFTConfig();
			this.guardip = sc.getGuardManagerIP();
		} else {
			this.guardip = ip;
		}
		if (apipData.equals("")) {
			this.apip = sc.getGuardManagerNetCard();
		} else {
			this.apip = apipData;
		}
		return encrypt();
	}

	public String encrypt() throws UnknownHostException, IOException {
		if (HARDWAREID != null && !HARDWAREID.isEmpty()) {
			return HARDWAREID;
		}

		String code = "";
		/* 是否為vm */
		if (new VirtualMachine().isVM()) {
			isvm = true;
			Socket socket = new Socket(guardip, port);
			DataOutputStream out = new DataOutputStream(socket.getOutputStream());
			// 設定key值 ip+SFT+今天日期
			String key = getkey();
			out.writeUTF(key);
			String codetemp = "";
			// Socket回傳
			InputStreamReader in = new InputStreamReader(socket.getInputStream());
			while (true) {
				int ch = in.read();
				codetemp += (char) ch;
				if (in.ready() == false)
					break;
			}
			in.close();
			socket.close();
			// BASE64Decoder 反解
			Base64.decode(codetemp);

			String dd = new String(Base64.decode(codetemp));

			// Xor運算 傳入 pkey + BASE64Decoder
			code = XorFunction(key.split(";")[1], dd);// 傳出32碼
		} else {
			isvm = false;
			RealMachine realMachine = new RealMachine();
			code = realMachine.encode_to_32char().toUpperCase();
		}
		if (code != null && code.length() < 30) {
			code = String.format("%-" + 30 + "s", code).replace(' ', '0');
		} else if (code != null && code.length() > 30) {
			code = code.substring(0, 30);
		}
		HARDWAREID = code;
		return code;
	}

	private String getkey() {
		// 取得ip位址
		String key = "";
		String day = "";
		InetAddress IP1;
		try {
			IP1 = InetAddress.getLocalHost();
			String ip = IP1.toString().split("/")[1];
			// 設定key值 ip+SFT+今天日期
			if (!this.apip.trim().equals("")) {
				ip = this.apip;
			}
			key = ip + ";" + "SFT" + day;
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
		return key;
	}

	private String XorFunction(String pkkey, String FData) {
		String returnd = "";
		char[] a = pkkey.toCharArray();
		char[] b = FData.toCharArray();
		for (int i = 0; i < b.length; i++) {
			for (int j = 0; j < a.length; j++) {
				b[i] = (char) (b[i] ^ a[j]);
			}
			returnd += (char) b[i];

		}
		return returnd;
	}

	public static void main(String[] args) {
		HardwareEncrypt he = new HardwareEncrypt();
		String s = "";
		try {
			s = he.encrypt();
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
