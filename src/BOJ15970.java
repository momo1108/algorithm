import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class BOJ15970 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, answer = 0;
    static Dot[] dots;

    static class Dot implements Comparable<Dot> {
        public int loc, color;

        public Dot(int loc, int color) {
            this.loc = loc;
            this.color = color;
        }

        @Override
        public int compareTo(Dot o) {
            // 색상별로 먼저 정렬 후, 좌표순으로 정렬
            if(color != o.color) return color - o.color;
            return loc - o.loc;
        }

        @Override
        public String toString() {
            return "색상 : " + color + ", 위치 : " + loc;
        }
    }

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        dots = new Dot[N];

        int loc, color;
        for (int i = 0; i < N; i++) {
            loc = fr.nextInt();
            color = fr.nextInt();
            dots[i] = new Dot(loc, color);
        }
    }

    static int checkSide(int index){
        int distance = Integer.MAX_VALUE;

        if(index > 0 && dots[index-1].color == dots[index].color) distance = Math.min(distance, dots[index].loc - dots[index-1].loc);
        if(index < N-1 && dots[index+1].color == dots[index].color) distance = Math.min(distance, dots[index+1].loc - dots[index].loc);

        return distance;
    }

    public static void main(String[] args) throws Exception {
        input();

        Arrays.sort(dots);

        for (int i = 0; i < N; i++) {
            answer += checkSide(i);
        }

        System.out.println(answer);
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