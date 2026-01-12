import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ16472 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N;
    static String str;
    static int[] count;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        str = fr.next();
        count = new int[26];
    }

    static int getCountAt(int index){
        return count[(int)str.charAt(index) - 97];
    }

    static void plusCountAt(int index){
        count[(int)str.charAt(index) - 97]++;
    }

    static void minusCountAt(int index){
        count[(int)str.charAt(index) - 97]--;
    }

    static void twoPointer(){
        int R = 0, alpha = 1, length = 0;
        plusCountAt(0);

        for(int L = 0; L < str.length() - 1; L++){
            while(R + 1 < str.length() && alpha <= N){
                R++;
                if(getCountAt(R) == 0) alpha++;
                plusCountAt(R);
            }
            length = Math.max(length, alpha <= N ? R - L + 1 : R - L);
            minusCountAt(L);
            if(getCountAt(L)==0) alpha--;
        }

        System.out.println(length);
    }

    public static void main(String[] args) throws Exception {
        // a 는 97
        input();
        twoPointer();
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