import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ2011 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static String pw;
    static int[] Dy;

    // 입력 함수
    static void input(){
        pw = fr.nextLine();
    }

    static void dp(){
        // Dy[i] : i 번째 글자까지 해석의 수
        Dy = new int[5001];

        // 초기값
        Dy[0] = 1; // 이건 2번째 글자에서 참조용
        Dy[1] = pw.charAt(0) == '0' ? 0 : 1;

        // 점화식 i번째까지 해석의 수
        // : i번째 글자를 하나로 사용 하는 경우 +
        //   i, i-1번째 글자를 하나로 사용하는 경우
        for (int i = 2; i <= pw.length(); i++) {
            if(pw.charAt(i-1) > '0') Dy[i] += Dy[i - 1]; // 한 글자로 사용
            if(pw.charAt(i-2) <= '2' && 
             pw.charAt(i-2) > '0' &&
             pw.charAt(i-1) < '7') Dy[i] += Dy[i - 2]; // 두 글자로 사용
            Dy[i] %= 1000000;
        }

        System.out.println(Dy[pw.length()]);
    }

    public static void main(String[] args) throws Exception {
        input();
        dp();
    }

    static class FastReader {
        BufferedReader br;
        StringTokenizer st;

        public FastReader() {
            br = new BufferedReader(new InputStreamReader(System.in));
        }

        public FastReader(String s) throws FileNotFoundException {
            br = new BufferedReader(new FileReader(new File(s)));
        }

        String next() {
            while (st == null || !st.hasMoreElements()) {
                try {
                    st = new StringTokenizer(br.readLine());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            return st.nextToken();
        }

        int nextInt() {
            return Integer.parseInt(next());
        }

        long nextLong() {
            return Long.parseLong(next());
        }

        double nextDouble() {
            return Double.parseDouble(next());
        }

        String nextLine() {
            String str = "";
            try {
                str = br.readLine();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return str;
        }
    }
}