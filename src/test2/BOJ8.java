package test2;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;
import java.util.TreeSet;

public class BOJ8 {
    // https://www.acmicpc.net/workbook/view/7976

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, M;
    static int[][] info;
    static TreeSet<Question> Q_All = new TreeSet<>();
    static TreeSet<Question>[] Q_Classfied = new TreeSet[101];
    static class Question implements Comparable<Question>{
        int number, difficulty;

        public Question(int n, int d){
            this.number = n;
            this.difficulty = d;
        }
        
        @Override
        public int compareTo(Question o) {
            return this.difficulty == o.difficulty? this.number - o.number : this.difficulty - o.difficulty;
        }
    }

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        info = new int[100001][2];
        for (int i = 1; i < 101; i++) {
            Q_Classfied[i] = new TreeSet<>();
        }

        int P, L, G;
        for (int i = 0; i < N; i++) {
            P = fr.nextInt();
            L = fr.nextInt();
            G = fr.nextInt();
            Question q = new Question(P, L);
            info[P] = new int[]{L, G};
            Q_All.add(q);
            Q_Classfied[G].add(q);
        }

        M = fr.nextInt();
    }

    static void solve(){
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < M; i++) {
            String line = fr.nextLine();
            String[] sl = line.split(" ");
            String command = sl[0];
            if(command.equals("recommend")){
                if(sl[2].equals("1")) sb.append(Q_Classfied[Integer.parseInt(sl[1])].last().number).append('\n');
                else sb.append(Q_Classfied[Integer.parseInt(sl[1])].first().number).append('\n');
            } else if(command.equals("recommend2")){
                if(sl[1].equals("1")) sb.append(Q_All.last().number).append('\n');
                else sb.append(Q_All.first().number).append('\n');
            } else if(command.equals("recommend3")){
                if(sl[1].equals("1")) {
                    Question result = Q_All.higher(new Question(0, Integer.parseInt(sl[2])));
                    if(result == null) sb.append("-1").append('\n');
                    else sb.append(result.number).append('\n');
                } else {
                    Question result = Q_All.lower(new Question(100001, Integer.parseInt(sl[2])));
                    if(result == null) sb.append("-1").append('\n');
                    else sb.append(result.number).append('\n');
                }
            } else if(command.equals("add")){
                int P = Integer.parseInt(sl[1]), L = Integer.parseInt(sl[2]), G = Integer.parseInt(sl[3]);
                info[P] = new int[]{L, G};
                Q_All.add(new Question(P, L));
                Q_Classfied[G].add(new Question(P, L));
            } else if(command.equals("solved")){
                int P = Integer.parseInt(sl[1]);
                Q_All.remove(new Question(P, info[P][0]));
                Q_Classfied[info[P][1]].remove(new Question(P, info[P][0]));
            }
        }
        System.out.println(sb);
    }

    public static void main(String[] args) throws Exception {
        input();
        solve();
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