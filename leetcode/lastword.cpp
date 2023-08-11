# include <iostream>
# include <vector>
# include <string>
# include <cctype>
using namespace std;
class Solution{
    public:
        int lengthOfLastWord(string s) {
        int len = s.size();
        int count =0;
        int num = 0;
        if (len ==1) {
            return count+=1;
        }else{
            for (int i=(len-1);i>=0;i--){
                if (isspace(s[i]) && num==0){
                    continue;
                }else{
                    num++;
                    if (isspace(s[i])){
                        break;
                    }else{
                        count+=1;
                    }
                }
        }
        }
        return count;
    }
};

int main(){
    Solution c;
    int ans;
    string d = "hello wordl";
    ans = c.lengthOfLastWord(d);
    cout<<ans;
}
