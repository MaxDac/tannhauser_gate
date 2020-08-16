sh kube-build.sh "$1" && \
    kubectl set image deployment/chat tannhauser-gate=tannhauser_gate_test:"$1"