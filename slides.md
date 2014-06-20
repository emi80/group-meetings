# Blueprint pipeline


## Blueprint pipeline
<div class="panel panel-default"><font color="#31708f">&#8658;</font> RNAseq pipeline written in Bash</div>
<!-- .element: style="margin-bottom: 2em;"-->

- mapping (GEMtools)
- bigwig
- contig
- quantification (Flux Capacitor)
- BAM statistics (RSeQC)


## Bash
<!-- .element: style="color: #3c763d;"-->

    #!/bin/bash

- widely supported on any Linux platform
<!-- .element: style="margin-top: 2em"-->
- most bioinformaticians are used to it


## SGE options
<!-- .element: style="color: #3c763d; margin-bottom: 1em;"-->

    # Force bash shell
    #$ -S /bin/bash
    #
    # Export environment variables
    #$ -V
    #
    # Use current working directory as job working directory
    #$ -cwd
    #
    # Rename stdout and stderr files
    #$ -o $JOB_NAME.out
    #$ -e $JOB_NAME.err

<!-- .element: style="margin-top: 3em"-->
<div class="panel panel-default">
Queue, memory and time **must** be specified when submitting the job.
</div>


## Modular execution
<!-- .element: style="color: #3c763d; margin-bottom: 0.6em;"-->

    # getting pipeline steps to be executed
    steps=(mapping bigwig contig flux)

    if [[ "$@" ]]; then
        read -ra steps <<< "$@"
    fi

    for step in ${steps[@]}; do
        case $step in
            mapping)
                doMapping="true"
                ;;
            bigwig)
                doBigWig="true"
                ;;
            contig)
                doContig="true"
                ;;
            quant|flux)
                doFlux="true"
                ;;
        esac
    done

Run specific steps:
<!-- .element: style="margin-top: 1em; text-align: left; margin-left: 1.5em;"-->

    blueprint.pipeline.sh ... -- contig flux


## Monolitic pipeline
<!-- .element: style="color: #a94442; margin-bottom: 1em;"-->

- pipeline steps are executed sequencially
- one cluster node per run is used <font color="#a94442">&#8605; weak parallelization</font>
- bad resource management - not all steps use the same amount of cpus/memory


## Batch execution
<!-- .element: style="color: #a94442; margin-bottom: 1em;"-->

Some extra code required:
<!-- .element: style="text-align: left; margin-left: 1.5em"-->

    #!/bin/bash

    base="/users/rg/epalumbo/projects/BluePrint"
    threads="8"
    vmem="64G"
    fluxMem=$((${vmem:0:$((${#vmem}-1))}/2))${vmem:$((${#vmem}-1)):1}
    rtime="72:00:00"
    do=${1-"echo"}

    while read lab id path strand sex; do
        quality="33"
        genome="$base/genome/Homo_sapiens.GRCh37.chromosomes.chr.fa"
        annotation="$base/annotation/gencode.v15.annotation.gtf"
        if [[ $sex == 'Female' ]]; then
            genome="$base/genome/Homo_sapiens.GRCh37.chromosomes.female.chr.fa"
            annotation="$base/annotation/gencode.v15.annotation.female.gtf"
        fi
        sample=`echo $id | cut -d"_" -f1`
        readGroup="ID=$id,PL=ILLUMINA,PU=$id,LB=Blueprint,SM=$sample,DT=`date +"%Y-%m-%dT%H:%M:%S%z"`,CN=$lab,DS=Blueprint"
        command="qsub -pe smp $threads -l virtual_free=$vmem,h_rt=$rtime -q rg-el6,long -N $id.pipeline"
        command=$command" ../blueprint.pipeline.sh -i `basename $path` -g $genome -a $annotation -q $quality -t $threads --paired --read-group $readGroup -r 150 --read-strand ${strand^^} --flux-mem $fluxMem"

        if [ ! -d $id ]; then
            $do "mkdir $id"
            $do "ln -s $path $id"
            $do "ln -s ${path//_1/_2} $id"
        fi
        $do "cd $id"
        $do "$command"
        $do "cd ..""
    done



## Data management
<!-- .element: style="color: #a94442; margin-bottom: 1em;"-->

User has to keep metadata and file information:
<!-- .element: style="margin-bottom: 1em;"-->

- tsv/csv files
- Google spreadsheets
- Index files <!-- .element: class="fragment grow" -->

------

# Idxtools


## Index files
<!-- .element: style="margin-bottom: 1em;"-->

<div class="panel panel-default"><font color="#31708f">&#8658;</font> plain text database files to store metadata information for files and their content</div>


## Format
<!-- .element: style="margin-bottom: 1em;"-->

    <filepath>TAB<attributes_list>

<!-- .element: style="margin-bottom: 1em; margin-top: 3em;"-->
with `attribute_list` as a semicolon separated list of `key=value` strings:

    /path/to/file    size=100; id=1; class=MyClass; type=MyType

------

# JIP

------

# Nextflow

------

# Grape 2
<!-- ------

# SOLiD pipeline -->
