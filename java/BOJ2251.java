import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ2251 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int[] storage, state;
    static boolean[] answer;
    static boolean[][][] visit;

    // 입력 함수
    static void input(){
        storage = new int[]{fr.nextInt(), fr.nextInt(), fr.nextInt()};
        state = new int[]{0, 0, storage[2]};
        answer = new boolean[storage[2]+1];

        visit = new boolean[storage[0]+1][storage[1]+1][storage[2]+1];
    }
    
    static void dfs(){
        visit[state[0]][state[1]][state[2]] = true;
        if(state[0]==0) answer[state[2]] = true;
        // System.out.println(state[0] + " " + state[1] + " " + state[2]);

        for(int start = 0; start < 3; start++){
            if(state[start] == 0) continue;
            for (int dest = 0; dest < 3; dest++) {
                if(start == dest) continue;

                int drip = Math.min(state[start], storage[dest] - state[dest]);
                state[dest] += drip;
                state[start] -= drip;
                if(!visit[state[0]][state[1]][state[2]]) dfs();
                state[dest] -= drip;
                state[start] += drip;
            }
        }
    }

    public static void main(String[] args) throws Exception {
        input();
        dfs();

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i <= storage[2]; i++) {
            if(answer[i]) sb.append(i).append(' ');
        }
        System.out.println(sb);
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